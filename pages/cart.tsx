import styled from '@emotion/styled'
import { Cart, OrderItem, products } from '@prisma/client'
import { IconRefresh, IconShoppingCart, IconX } from '@tabler/icons-react'
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import Button from 'components/Button'
import { CountControl } from 'components/CountControl'
import { CATEGORY_MAP } from 'constants/products'
import Image from 'next/image'
import { Router, useRouter } from 'next/router'
import React, { useState } from 'react'
import { useMemo } from 'react'
import { useEffect } from 'react'
import { ORDER_QUERY_KEY } from './my'

interface CartItem extends Cart {
  name: string
  price: number
  image_url: string
}

export const CART_QUERY_KEY = '/api/get-cart'

export default function CartPage() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { data } = useQuery<CartItem[], unknown, CartItem[], [string]>(
    [CART_QUERY_KEY],
    () =>
      fetch(CART_QUERY_KEY)
        .then((res) => res.json())
        .then((data) => data.items)
  )

  const diliveryAmount = data && data.length > 0 ? 5000 : 0
  const discountAmount = 0

  const amount = useMemo(() => {
    if (data == null) {
      return 0
    }
    return data
      .map((item) => item.amount)
      .reduce((prev, curr) => prev + curr, 0)
  }, [data])

  const { data: products } = useQuery<
    { items: products[] },
    unknown,
    products[]
  >(
    [`/api/get-products?skip=0&take=3`],
    () => fetch(`/api/get-products?skip=0&take=3`).then((res) => res.json()),
    {
      select: (data) => data.items,
    }
  )

  const { mutate: addOrder } = useMutation<
    unknown,
    unknown,
    Omit<OrderItem, 'id'>[],
    any
  >(
    (items) =>
      fetch(`/api/add-order`, {
        method: 'POST',
        body: JSON.stringify({ items }),
      })
        .then((data) => data.json())
        .then((res) => res.items),
    {
      onMutate: () => {
        queryClient.invalidateQueries([ORDER_QUERY_KEY])
      },
      onSuccess: () => {
        router.push('/my')
      },
    }
  )

  const handleOrder = () => {
    //TODO: 주문하기 기능 구현

    if (data == null) {
      return
    }
    addOrder(
      data.map((cart) => ({
        productId: cart.productId,
        price: cart.price,
        amount: cart.amount,
        quantity: cart.quantity,
      }))
    )
    alert(`장바구니에 담긴 것들 ${JSON.stringify(data)} 주문`)
  }

  return (
    <div>
      <span className="text-2xl mb-3"> Cart ({data ? data.length : 0})</span>
      <div className="flex">
        <div className="flex flex-col p-4 space-y-4 flex-1">
          {data && data?.length > 0 ? (
            data.map((item, idx) => <Item key={idx} {...item}></Item>)
          ) : (
            <div>장바구니에 아무것도 없습니다.</div>
          )}
        </div>
        <div className="px-4">
          <div
            className="flex flex-col p-4 space-y-4"
            style={{ minWidth: 300, border: '1px solid grey' }}
          >
            <div>Info</div>

            <Row>
              <span>금액</span>
              <span>{amount.toLocaleString('ko-kr')}원</span>
            </Row>
            <Row>
              <span>배송비</span>
              <span>{diliveryAmount.toLocaleString('ko-kr')}원</span>
            </Row>
            <Row>
              <span>할인 금액</span>
              <span>{discountAmount.toLocaleString('ko-kr')}원</span>
            </Row>
            <Row>
              <span className="font-semibold">결제 금액</span>
              <span className="font-semibold text-red-500">
                {(amount + diliveryAmount - discountAmount).toLocaleString(
                  'ko-kr'
                )}
                원
              </span>
            </Row>
            <Button
              style={{ backgroundColor: 'rgb(247, 159, 31)' }}
              radius="xl"
              size="md"
              styles={{
                root: { height: 48 },
              }}
              onClick={handleOrder}
            >
              구매하기
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-32">
        <p>추천상품</p>
        {products && (
          <div className="grid grid-cols-3 gap-5">
            {products.map((item) => (
              <div
                key={item.id}
                style={{ maxWidth: 310 }}
                onClick={() =>
                  router.push({
                    pathname: `/products/${item.id}`,
                    query: { id: item.id },
                  })
                }
              >
                <Image
                  className="rounded"
                  alt={item.name}
                  src={item.image_url ?? ''}
                  width={310}
                  height={390}
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPk4eapBwAA8gCkI4u+qAAAAABJRU5ErkJggg==
                "
                />
                <div className="flex">
                  <span>{item.name}</span>
                  <span className="ml-auto">
                    {item.price.toLocaleString('ko-KR')}원
                  </span>
                </div>
                <span className="text-zinc-400">
                  {CATEGORY_MAP[item.category_id - 1]}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const Item = (props: CartItem) => {
  const router = useRouter()

  const queryClient = useQueryClient()
  const [quantity, setQuantity] = useState<number | undefined>(props.quantity)
  const [amount, setAmount] = useState<number>(props.quantity)
  useEffect(() => {
    if (quantity != null) {
      setAmount(quantity * props.price)
    }
  }, [quantity, props.price])

  const { mutate: updateCart } = useMutation<unknown, unknown, Cart, any>(
    (item) =>
      fetch(`/api/update-cart`, {
        method: 'POST',
        body: JSON.stringify({ item }),
      })
        .then((data) => data.json())
        .then((res) => res.items),
    {
      onMutate: async (item) => {
        // (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries([CART_QUERY_KEY])

        // Snapshot the previous value
        const previous = queryClient.getQueryData([CART_QUERY_KEY])

        // Optimistically update to the new value
        queryClient.setQueryData<Cart[]>([CART_QUERY_KEY], (old) =>
          old?.filter((c) => c.id !== item.id).concat(item)
        )
        // Return a context object with the snapshotted value
        return { previous }
      },
      onError: (error, _, context) => {
        queryClient.setQueriesData([CART_QUERY_KEY], context.previous)
        console.error(error)
      },
      onSuccess: () => {
        queryClient.invalidateQueries([CART_QUERY_KEY])
      },
    }
  )

  const { mutate: deleteCart } = useMutation<unknown, unknown, number, any>(
    (id) =>
      fetch(`/api/delete-cart`, {
        method: 'POST',
        body: JSON.stringify({ id }),
      })
        .then((data) => data.json())
        .then((res) => res.items),
    {
      onMutate: async (id) => {
        // (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries([CART_QUERY_KEY])

        // Snapshot the previous value
        const previous = queryClient.getQueryData([CART_QUERY_KEY])

        // Optimistically update to the new value
        queryClient.setQueryData<Cart[]>([CART_QUERY_KEY], (old) =>
          old?.filter((c) => c.id !== id)
        )
        // Return a context object with the snapshotted value
        return { previous }
      },
      onError: (error, _, context) => {
        queryClient.setQueriesData([CART_QUERY_KEY], context.previous)
        console.error(error)
      },
      onSuccess: () => {
        queryClient.invalidateQueries([CART_QUERY_KEY])
      },
    }
  )

  const handleDelete = async () => {
    //TODO: 장바구니에서 삭제 기능 구현

    await deleteCart(props.id)
    alert(`장바구니${props.name} 삭제`)
  }

  const handleUpdate = () => {
    if (quantity == null) {
      alert('최소 수량을 선택하세요.')
      return
    }
    //TODO: 장바구니에서 삭제 기능 구현
    updateCart({ ...props, quantity: quantity, amount: props.price * quantity })
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
          <IconRefresh onClick={handleUpdate} />
        </div>
      </div>
      <div className="flex ml-auto space-x-4">
        <span>{amount.toLocaleString('ko-kr')}원</span>
        <IconX
          className="border border-gray-300 rounded-sm p-1 cursor-pointer"
          onClick={handleDelete}
        />
      </div>
    </div>
  )
}

const Row = styled.div`
  display: flex;
  * ~ * {
    margin-left: auto;
  }
`
