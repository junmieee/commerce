import styled from '@emotion/styled'
import { Badge } from '@mantine/core'
import { Cart, OrderItem, Orders, products } from '@prisma/client'
import { IconRefresh, IconShoppingCart, IconX } from '@tabler/icons-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Button from 'components/Button'
import { CountControl } from 'components/CountControl'
import { CATEGORY_MAP } from 'constants/products'
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

const ORDER_STATUS_MAP = [
  '주문취소',
  '주문대기',
  '결제대기',
  '결제완료',
  '배송대기',
  '배송중',
  '배송완료',
  '환불대기',
  '환불완료',
  '반품대기',
  '반품완료',
]

export const ORDER_QUERY_KEY = '/api/get-order'

export default function MyPage() {
  const router = useRouter()
  const { data } = useQuery<{ items: OrderDetail[] }, unknown, OrderDetail[]>(
    [ORDER_QUERY_KEY],
    () =>
      fetch(ORDER_QUERY_KEY)
        .then((res) => res.json())
        .then((data) => data.items)
  )

  return (
    <div>
      <span className="text-2xl mb-3">
        {' '}
        주문내역 ({data ? data.length : 0})
      </span>
      <div className="flex">
        <div className="flex flex-col p-4 space-y-4 flex-1">
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
  return (
    <div
      className="w-full flex flex-col p-4 rounded-md"
      style={{ border: '1px solid grey' }}
    >
      <div className="flex">
        <Badge color={props.status === -1 ? 'red' : ''} className="mb-2">
          {ORDER_STATUS_MAP[props.status + 1]}
        </Badge>
        <IconX className="ml-auto" />
      </div>
      {props.orderItems.map((orderItem, idx) => (
        <Item key={idx} {...orderItem} />
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
          <Button style={{ backgroundColor: 'black', color: 'white' }}>
            결제 처리
          </Button>
        </div>
      </div>
    </div>
  )
}

const Item = (props: OrderItemDetail) => {
  const router = useRouter()
  const [quantity, setQuantity] = useState<number | undefined>(props.quantity)
  const [amount, setAmount] = useState<number>(props.quantity)
  useEffect(() => {
    if (quantity != null) {
      setAmount(quantity * props.price)
    }
  }, [quantity, props.price])

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
      <div className="flex ml-auto space-x-4">
        <span>{amount.toLocaleString('ko-kr')}원</span>
      </div>
    </div>
  )
}
