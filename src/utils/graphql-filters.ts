import { FilterType } from "@/types/filter-types";
import { PriorityTypes } from "@/types/priority-types";
import { ProductFetchResponse } from "@/types/product";

// This function builds a GraphQL query, but now it fetches all products and applies filters client-side
export const mountQuery = () => {
  return `
    query {
      products {
        id
        name
        price_in_cents
        image_url
        description
        category
        created_at
        sales
      }
    }
  `;
};