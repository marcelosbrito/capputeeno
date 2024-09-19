import { ProductsFetchResponse } from "@/types/products-response";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios";
import { useFilter } from "./useFilter";
import { mountQuery } from "@/utils/graphql-filters"; // The utility to generate the GraphQL query
import { useDeferredValue } from "react";
import { filterAndSortProducts } from "@/utils/client-side-filters";

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

// Fetches all products from the server
const fetcher = (query: string): AxiosPromise<ProductsFetchResponse> => {
  const url = `${API_URL}?query=${encodeURIComponent(query)}`;
  return axios.get(url);
}

export function useProducts() {
  // Get the current filter, priority, and search from the filter hook
  const { type, priority, search } = useFilter();
  const searchDeferred = useDeferredValue(search); // Defer search input for performance optimization

  // Generate a query that fetches all products from the server
  const query = mountQuery(); 

  // Fetch the data using react-query
  const { data } = useQuery({
    queryFn: () => fetcher(query),
    queryKey: ['products'],
    staleTime: 1000 * 60 * 2,
  });

  // Get all products from the response
  const allProducts = data?.data?.data?.products || [];

  // Apply client-side filtering (by search term and category) and sorting (by priority)
  const filteredProducts = filterAndSortProducts(allProducts, type, priority, searchDeferred);

  return {
    data: filteredProducts, // Return the filtered and sorted list of products
  };
}
