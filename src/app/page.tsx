"use client"

import { FilterBar } from '@/components/Filter-bar'
import { ProductsList } from '@/components/Products-list'
import { DefaultPageLayout } from '@/components/Default-page-layout'
import styled from 'styled-components'

const PageWrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`
export default function Home() {
  return (
    <DefaultPageLayout>
      <PageWrapper>
        <FilterBar/>
        <ProductsList />
      </PageWrapper>
    </DefaultPageLayout>
  )
}
