"use client"

import { BackBtn } from "@/components/Back-button"
import { DefaultPageLayout } from "@/components/Default-page-layout"
import styled from "styled-components"

interface ProductProps {

}

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
`


export default function Product(props : ProductProps){
  return(
    <DefaultPageLayout>
      <Container>
        <BackBtn navigate="/" />
        <section>about this item</section>
      </Container>
    </DefaultPageLayout>
  )
}