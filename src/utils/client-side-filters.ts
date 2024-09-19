import { FilterType } from "@/types/filter-types";
import { PriorityTypes } from "@/types/priority-types";
import { Product } from "@/types/product";

// Function to get the category by filter type
export function getCategoryByType(type: FilterType) {
  if (type === FilterType.MUG) return "mugs";
  if (type === FilterType.SHIRT) return "t-shirts";
  return "";  // No filter for ALL types
}

// Client-side filter and sort function
export function filterAndSortProducts(
  products: Product[],
  type: FilterType,
  priority: PriorityTypes,
  search: string
) {
  // Client-side filtering by category
  const categoryFilter = getCategoryByType(type);
  let filteredProducts = products;
  

  if (categoryFilter) {
    filteredProducts = filteredProducts.filter(product => product.category === categoryFilter);
  }

  // Filter by search term (if provided)
  if (search) {
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Sort by priority (price, date, sales)
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

// The priority sorting fields as determined by user selection
function getFieldByPriority(priority: PriorityTypes) {
  if (priority === PriorityTypes.NEWS) return { field: "created_at", order: "ASC" };
  if (priority === PriorityTypes.BIGGEST_PRICE) return { field: "price_in_cents", order: "DESC" };
  if (priority === PriorityTypes.MINOR_PRICE) return { field: "price_in_cents", order: "ASC" };
  return { field: "sales", order: "DESC" }; // Default sorting by sales
}
