export interface Product {
  name: string,
  price_in_cents: number,
  id: string,
  image_url: string,
  description?: string,
  category?: string,
  sales?: number,
  created_at?: string,
}


export interface ProductInCart extends Product {
  quantity: number
}

export interface ProductFetchResponse {
  data: {
    products: Product[];
  }
}