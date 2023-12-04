"use client"

import { BackBtn } from "@/components/Back-button";
import { DefaultPageLayout } from "@/components/Default-page-layout";
import { Divider } from "@/components/Divider";
import { CartItem } from "@/components/cart/Cart-item";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { ProductInCart } from "@/types/product";
import { formatPrice } from "@/utils/format-price";
import { styled } from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 32px;

  @media(min-width: ${props => props.theme.desktopBreakpoint}){
    flex-direction: row;
  }
`
const CartListContainer = styled.div`
  h3 {
    font-size: 24px;
    font-weight: 500;
    line-height: 150%;
    text-transform: uppercase;
    color: var(--text-dark-2);
    margin-top: 24px;
  }

  p {
    font-size: 16px;
    font-weight: 300;
    line-height: 150%;
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
const CartResultContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  background: white;
  min-width: 352px;
  padding: 16px 24px;

  h3 {
    font-size: 20px;
    font-weight: 600;
    color: var(--text-dark-2);
    text-transform: uppercase;
    margin-bottom: 30px;
  }
`
const TotalItem = styled.div<{ isBold: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  font-weight: ${props => props.isBold ? '600' : '400'};
  font-size: 16px;
  line-height: 150%;

  margin-bottom: 12px;
`
const ShopBtn = styled.button`
  color: white;
  border-radius: 4px;
  background: var(--success-color);
  padding: 12px;
  width: 100%;
  border: none;
  margin-top: 40px;
  cursor: pointer;
`

export default function CartPage(){
  const { value, updateLocalStorage } = useLocalStorage<ProductInCart[]>("cart-items", [])
  const calculateTotal = (value: ProductInCart[]) => {
    return value.reduce((sum, item) => sum += (item.price_in_cents * item.quantity), 0)
  }

  const shippingFee = 0
  const cartShipping = formatPrice(shippingFee)
  const cartTotal = formatPrice(calculateTotal(value))
  const cartTotalWithShipping = formatPrice(calculateTotal(value) + shippingFee)

  const handleUpdateQuantity = (id: string, quantity: number) => {
    const newValue = value.map(item => {
      if(item.id !== id) return item
      return {...item, quantity: quantity}
    })
    updateLocalStorage(newValue)
  }

  const handleDeleteItem = (id: string) => {
    const newValue = value.filter(item => {
      if(item.id !== id) return item
    })
    updateLocalStorage(newValue)
  }

  return(
    <DefaultPageLayout>
      <Container>
        <CartListContainer>
        <BackBtn navigate="/"/>
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
              handleDelete={handleDeleteItem}
            />)}
          </CartList>
        </CartListContainer>
        <CartResultContainer>
          <h3>Order Summary</h3>
          <TotalItem  isBold={false}>
            <p>Product subtotal</p>
            <p>{cartTotal}</p>
          </TotalItem>
          <TotalItem isBold={false}>
            <p>Shipping</p>
            <p>{cartShipping}</p>
          </TotalItem>
          <Divider/>
          <TotalItem isBold>
            <p>Total</p>
            <p>{cartTotalWithShipping}</p>
          </TotalItem>
          <ShopBtn>SHOP NOW</ShopBtn>
        </CartResultContainer>
      </Container>
    </DefaultPageLayout>
  )
}