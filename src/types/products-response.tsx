import { products } from "./product"

export interface ProductsFetchResponse {
  data: {
    products: products[]
  }
}