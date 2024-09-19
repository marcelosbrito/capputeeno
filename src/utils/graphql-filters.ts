import { FilterType } from "@/types/filter-types";
import { PriorityTypes } from "@/types/priority-types";
import { ProductFetchResponse } from "@/types/product";

// Function to get the category by filter type
export function getCategoryByType(type: FilterType) {
  if (type === FilterType.MUG) return "mugs";
  if (type === FilterType.SHIRT) return "t-shirts";
  return "";  // No filter for ALL types
}

// Function to determine sorting settings by priority
export function getFieldByPriority(priority: PriorityTypes) {
  if (priority === PriorityTypes.NEWS) return { field: "created_at", order: "ASC" };
  if (priority === PriorityTypes.BIGGEST_PRICE) return { field: "price_in_cents", order: "DESC" };
  if (priority === PriorityTypes.MINOR_PRICE) return { field: "price_in_cents", order: "ASC" };
  return { field: "sales", order: "DESC" };
}

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

// Function to filter and sort products on the client side
export function filterAndSortProducts(
  products: ProductFetchResponse["data"],
  type: FilterType,
  priority: PriorityTypes
) {
  // Client-side filtering by category
  const categoryFilter = getCategoryByType(type);
  let filteredProducts = products?.products || [];

  if (categoryFilter) {
    filteredProducts = filteredProducts.filter(product => product.category === categoryFilter);
  }

  // Client-side sorting by priority
  const sortSettings = getFieldByPriority(priority);
  filteredProducts.sort((a, b) => {
    if (sortSettings.order === "ASC") {
      return a[sortSettings.field] > b[sortSettings.field] ? 1 : -1;
    } else {
      return a[sortSettings.field] < b[sortSettings.field] ? 1 : -1;
    }
  });

  return filteredProducts;
}
