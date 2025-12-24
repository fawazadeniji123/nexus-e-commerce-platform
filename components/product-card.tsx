import Image from "next/image"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-lg hover:shadow-primary/20">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={product.image_url || "/placeholder.svg?height=400&width=400"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="mb-2 flex items-start justify-between">
          <h3 className="font-semibold text-pretty">{product.name}</h3>
          <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
        </div>
        <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Add to Cart</Button>
      </div>
    </div>
  )
}
