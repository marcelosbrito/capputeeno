"use client"

import Image from 'next/image'
import styles from './page.module.css'
import { FilterBar } from '@/components/Filter-bar'
import { ProductsList } from '@/components/Products-list'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function Home() {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <main className={styles.main}>
        <FilterBar/>
        <ProductsList />
      </main>
    </QueryClientProvider>
  )
}
