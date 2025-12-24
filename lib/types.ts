export interface Product {
  id: string
  name: string
  description: string | null
  price: number
  category_id: string | null
  image_url: string | null
  stock_quantity: number
  rating: number
  created_at: string
}

export interface Category {
  id: string
  name: string
  created_at: string
}

export interface Order {
  id: string
  user_id: string | null
  status: string
  total_amount: number
  stripe_session_id: string | null
  created_at: string
}

export interface CartItem {
  product: Product
  quantity: number
}
