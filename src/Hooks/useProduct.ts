import { ProductFetchResponse } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

const fetcher = (): AxiosPromise<ProductFetchResponse> => {
  const query = `
    query {
      products {
        id
        name
        description
        price_in_cents
        category
        image_url
      }
    }
  `;
  const url = `${API_URL}?query=${encodeURIComponent(query)}`;
  console.log(url);
  return axios.get(url);
};

export function useProduct(id: string) {
  const { data } = useQuery({
    queryFn: () => fetcher(),
    queryKey: ['products'], 
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });

  // Filter the product by id in the client-side
  const product = data?.data?.data?.products?.find(
    (product) => product.id === id
  );

  return {
    data: product,
  };
}
