import { ProductFetchResponse } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

const fetcher = (productId: string): AxiosPromise<ProductFetchResponse> => {
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
  return axios.get(url);
};

export function useProduct(id: string) {
  const { data } = useQuery({
    queryFn: () => fetcher(id),
    queryKey: ['product', id],
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });

  // Ensure that the products field is treated as an array
  const allProducts = data?.data?.data?.products || [];
  
  // Filter the product by id in the client-side
  const product = allProducts.find(
    (product) => product.id === id
  );

  return {
    data: product,
  };
}
