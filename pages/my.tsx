import styled from '@emotion/styled'
import { Badge } from '@mantine/core'
import { Cart, OrderItem, Orders, products } from '@prisma/client'
import { IconRefresh, IconShoppingCart, IconX } from '@tabler/icons-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Button from 'components/Button'
import { CountControl } from 'components/CountControl'
import { CATEGORY_MAP, ORDER_STATUS_MAP } from 'constants/products'
import Image from 'next/image'
import { Router, useRouter } from 'next/router'
import { format } from 'date-fns'
import React, { useState } from 'react'
import { useMemo } from 'react'
import { useEffect } from 'react'

interface OrderItemDetail extends OrderItem {
  name: string
  image_url: string
}

interface OrderDetail extends Orders {
  orderItems: OrderItemDetail[]
}

export const ORDER_QUERY_KEY = '/api/get-order'

export default function MyPage() {
  const { data } = useQuery<{ items: OrderDetail[] }, unknown, OrderDetail[]>(
    [ORDER_QUERY_KEY],
    () =>
      fetch(ORDER_QUERY_KEY)
        .then((res) => res.json())
        .then((data) => data.items)
  )

  return (
    <div
      className="px-36 mt-36 mb-36 mx-auto xl:w-5/6
    "
    >
      <span className="text-2xl block mb-4">
        {' '}
        주문내역 ({data ? data.length : 0})
      </span>
      <div className="flex ">
        <div className="flex w-full flex-col space-y-4 flex-1">
          {data ? (
            data?.length > 0 ? (
              data.map((item, idx) => (
                <DetailItem key={idx} {...item}></DetailItem>
              ))
            ) : (
              <div>주문내역이 아무것도 없습니다.</div>
            )
          ) : (
            <div>불러오는 중...</div>
          )}
        </div>
      </div>
    </div>
  )
}

const DetailItem = (props: OrderDetail) => {
  const queryClient = useQueryClient()

  const { mutate: updateOrderStatus } = useMutation<
    unknown,
    unknown,
    number,
    any
  >(
    (status) =>
      fetch(`/api/update-order-status`, {
        method: 'POST',
        body: JSON.stringify({
          id: props.id,
          status: status,
          userId: props.userId,
        }),
      })
        .then((data) => data.json())
        .then((res) => res.items),
    {
      onMutate: async (status) => {
        // (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries([ORDER_QUERY_KEY])

        // Snapshot the previous value
        const previous = queryClient.getQueryData([ORDER_QUERY_KEY])

        // Optimistically update to the new value
        queryClient.setQueryData<Cart[]>([ORDER_QUERY_KEY], (old) =>
          old?.map((c) => {
            if (c.id === props.id) {
              return { ...c, status: status }
            }
            return c
          })
        )
        // Return a context object with the snapshotted value
        return { previous }
      },
      onError: (error, _, context) => {
        queryClient.setQueriesData([ORDER_QUERY_KEY], context.previous)
        console.error(error)
      },
      onSuccess: () => {
        queryClient.invalidateQueries([ORDER_QUERY_KEY])
      },
    }
  )

  const handlePayment = () => {
    // 주문 상태를 5로 변경
    updateOrderStatus(5)
  }

  const handleCancel = () => {
    //주문상태를 -1로 변경
    updateOrderStatus(-1)
  }
  return (
    <div
      className="w-full flex flex-col p-4 rounded-md"
      style={{ border: '1px solid grey' }}
    >
      <div className="flex">
        <Badge color={props.status === -1 ? 'red' : ''} className="mb-2">
          {ORDER_STATUS_MAP[props.status + 1]}
        </Badge>
        <IconX className="ml-auto" onClick={handleCancel} />
      </div>
      {props.orderItems.map((orderItem, idx) => (
        <Item key={idx} {...orderItem} status={props.status} />
      ))}
      <div className="flex mt-4">
        <div className="flex flex-col">
          <span className="">주문 정보</span>
          <span>받는 사람: {props.receiver ?? '입력 필요'}</span>
          <span>주소:{props.address ?? '입력 필요'}</span>
          <span>연락처: {props.phoneNumber ?? '입력 필요'}</span>
        </div>
        <div className="flex flex-col ml-auto mr-4 text-right">
          <span className="mb-2 font-semibold">
            합계 금액:{' '}
            <span className="text-red-500">
              {props.orderItems
                .map((item) => item.amount)
                .reduce((prev, curr) => prev + curr, 0)
                .toLocaleString('ko-kr')}
              원
            </span>
          </span>
          <span className="text-zinc-400 mt-auto mb-auto">
            주문 일자:{' '}
            {format(new Date(props.createdAt), 'yyyy년 M월 d일 HH:mm:ss')}
          </span>
          <Button
            style={{ backgroundColor: 'black', color: 'white' }}
            onClick={handlePayment}
          >
            결제 처리
          </Button>
        </div>
      </div>
    </div>
  )
}

const Item = (props: OrderItemDetail & { status: number }) => {
  const router = useRouter()
  const [quantity, setQuantity] = useState<number | undefined>(props.quantity)
  const [amount, setAmount] = useState<number>(props.quantity)
  useEffect(() => {
    if (quantity != null) {
      setAmount(quantity * props.price)
    }
  }, [quantity, props.price])

  const handleComment = () => {
    router.push(`comment/edit?orderItemId=${props.id}`)
  }

  return (
    <div className="w-full flex p-4" style={{ borderBottom: '1px solid grey' }}>
      <Image
        onClick={() => router.push(`/products/${props.productId}`)}
        src={props.image_url}
        width={155}
        height={195}
        alt={props.name}
      />
      <div className="flex flex-col ml-4">
        <span className="font-semibold mb-2">{props.name}</span>
        <span className="mb-auto">
          가격: {props.price.toLocaleString('ko-kr')}원
        </span>
        <div className="flex items-center space-x-4">
          <CountControl value={quantity} setValue={setQuantity} max={20} />
        </div>
      </div>
      <div className="flex flex-col ml-auto space-x-4">
        <span>{amount.toLocaleString('ko-kr')}원</span>
      </div>
      {props.status === 5 && (
        <Button
          style={{
            backgroundColor: 'black',
            color: 'white',
            marginTop: 'auto',
          }}
          onClick={handleComment}
        >
          후기 작성
        </Button>
      )}
    </div>
  )
}
