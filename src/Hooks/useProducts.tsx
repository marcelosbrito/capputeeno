import { ProductsFetchResponse } from "@/types/products-response";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios";
import { useFilter } from "./useFilter";
import { FilterType } from "@/types/filter-types";
import { getCategoryByType } from "@/utils/get-category-by-type";

const API_URL = process.env.NEXT_PUBLIC_API_URL as string

const fetcher = (query: string): AxiosPromise<ProductsFetchResponse> => {
  return axios.post(API_URL, { query })
}

const mountQuery = (type: FilterType) => {
  if (type === FilterType.ALL) return `query{
            allProducts{
              id
              name
              price_in_cents
              image_url
            }
          }`
  return `
    query{
    allProducts(filter: { category: "${getCategoryByType(type)}" }){
      id
      name
      price_in_cents
      image_url
      category
    }
  }
  `
}

export function useProducts(){
  const { type } = useFilter()
  const query = mountQuery(type)
  const { data }  = useQuery ({
    queryFn: () => fetcher(query),
    queryKey: ['products', type],
  })

  return {
    data: data?.data?.data?.allProducts
  }
}