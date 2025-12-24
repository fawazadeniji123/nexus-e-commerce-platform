"use server"

import { createClient } from "@/lib/supabase/server"
import type { Product, Category } from "@/lib/types"

export async function getProducts(filters?: {
  minPrice?: number
  maxPrice?: number
  categories?: string[]
  rating?: number
}): Promise<Product[]> {
  const supabase = await createClient()

  let query = supabase.from("products").select("*").order("created_at", { ascending: false })

  if (filters) {
    if (filters.minPrice !== undefined) {
      query = query.gte("price", filters.minPrice)
    }
    if (filters.maxPrice !== undefined) {
      query = query.lte("price", filters.maxPrice)
    }
    if (filters.categories && filters.categories.length > 0) {
      const categoryQuery = supabase.from("categories").select("id").in("name", filters.categories)

      const { data: categoryData } = await categoryQuery
      if (categoryData && categoryData.length > 0) {
        query = query.in(
          "category_id",
          categoryData.map((c) => c.id),
        )
      }
    }
    if (filters.rating !== undefined) {
      query = query.gte("rating", filters.rating)
    }
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching products:", error)
    return []
  }

  return data || []
}

export async function getCategories(): Promise<Category[]> {
  const supabase = await createClient()
  const { data, error } = await supabase.from("categories").select("*").order("name")

  if (error) {
    console.error("Error fetching categories:", error)
    return []
  }

  return data || []
}
