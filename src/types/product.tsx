export interface products {
  name: string,
  price_in_cents: number,
  id: string,
  image_url: string,
  description?: string,
  category?: string
}


export interface ProductInCart extends products {
  quantity: number
}

export interface ProductFetchResponse {
  data: {
    products: products
  }
}