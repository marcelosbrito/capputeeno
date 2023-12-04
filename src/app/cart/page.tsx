"use client"

import { BackBtn } from "@/components/Back-button";
import { DefaultPageLayout } from "@/components/Default-page-layout";
import { CartItem } from "@/components/cart/Cart-item";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Product, ProductInCart } from "@/types/product";
import { formatPrice } from "@/utils/format-price";
import { styled } from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
`
const CartListContainer = styled.div`
  h3 {
    font-size: 24px;
    font-weight: 500;
    line-break: 150%;
    text-transform: uppercase;
    color: var(--text-dark-2);
    margin-top: 24px;
  }

  p {
    font-size: 16px;
    font-weight: 300;
    line-break: 150%;
    color: var(--text-dark-2)
  }

  span {
    font-weight: 600;
  }
`
const CartList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  list-style: none;
  gap: 16px;
  margin-top: 24px;
`

export default function CartPage(){
  const { value, updateLocalStorage } = useLocalStorage<ProductInCart[]>("cart-items", [])
  const calculateTotal = (value: ProductInCart[]) => {
    return value.reduce((sum, item) => sum += (item.price_in_cents * item.quantity), 0)
  }

  const cartTotal = formatPrice(calculateTotal(value))

  const handleUpdateQuantity = (id: string, quantity: number) => {
    const newValue = value.map(item => {
      if(item.id !== id) return item
      return {...item, quantity: quantity}
    })
    updateLocalStorage(newValue)
  }

  return(
    <DefaultPageLayout>
      <Container>
        <BackBtn navigate="/"/>
        <CartListContainer>
          <h3>Your Cart</h3>
          <p>
            Total {value.length} products:
            <span> {cartTotal} </span>
          </p>
          <CartList>
            {value.map(item => 
            <CartItem 
              product={item} 
              key={item.id}
              handleUpdateQuantity={handleUpdateQuantity}
            />)}
          </CartList>
        </CartListContainer>
      </Container>
    </DefaultPageLayout>
  )
}