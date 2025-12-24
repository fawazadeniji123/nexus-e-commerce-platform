"use client"

import { useState, useTransition } from "react"
import { ChevronDown, Star } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import type { Category } from "@/lib/types"

interface ProductFiltersProps {
  categories: Category[]
  onFilterChange: (filters: {
    minPrice: number
    maxPrice: number
    categories: string[]
    rating: number | null
  }) => void
}

export function ProductFilters({ categories, onFilterChange }: ProductFiltersProps) {
  const [isPending, startTransition] = useTransition()
  const [priceRange, setPriceRange] = useState([30, 50])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedRating, setSelectedRating] = useState<number | null>(null)

  const handleFilterChange = (
    updates: Partial<{
      priceRange: number[]
      categories: string[]
      rating: number | null
    }>,
  ) => {
    const newPriceRange = updates.priceRange || priceRange
    const newCategories = updates.categories !== undefined ? updates.categories : selectedCategories
    const newRating = updates.rating !== undefined ? updates.rating : selectedRating

    if (updates.priceRange) setPriceRange(updates.priceRange)
    if (updates.categories !== undefined) setSelectedCategories(updates.categories)
    if (updates.rating !== undefined) setSelectedRating(updates.rating)

    startTransition(() => {
      onFilterChange({
        minPrice: newPriceRange[0],
        maxPrice: newPriceRange[1],
        categories: newCategories,
        rating: newRating,
      })
    })
  }

  const handleCategoryToggle = (categoryName: string) => {
    const newCategories = selectedCategories.includes(categoryName)
      ? selectedCategories.filter((c) => c !== categoryName)
      : [...selectedCategories, categoryName]
    handleFilterChange({ categories: newCategories })
  }

  const ratingOptions = [
    { value: 4.0, label: "4.0" },
    { value: 4.0, label: "4.0" },
    { value: 7.0, label: "7.0" },
    { value: 1.0, label: "1.0" },
  ]

  return (
    <aside className="w-full space-y-6 rounded-2xl border border-border bg-card p-6">
      <div>
        <button className="mb-4 flex w-full items-center justify-between text-lg font-semibold">
          Sort by
          <ChevronDown className="h-5 w-5" />
        </button>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Price Range</span>
          </div>
          <Slider
            value={priceRange}
            onValueChange={(value) => handleFilterChange({ priceRange: value })}
            min={30}
            max={50}
            step={1}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm font-medium">
            <span>${priceRange[0]}.00</span>
            <span>${priceRange[1]}.00</span>
          </div>
        </div>
      </div>

      <div>
        <button className="mb-4 flex w-full items-center justify-between text-lg font-semibold">
          Category
          <ChevronDown className="h-5 w-5" />
        </button>
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={category.id}
                checked={selectedCategories.includes(category.name)}
                onCheckedChange={() => handleCategoryToggle(category.name)}
              />
              <Label
                htmlFor={category.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {category.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <button className="mb-4 flex w-full items-center justify-between text-lg font-semibold">
          Rating
          <ChevronDown className="h-5 w-5" />
        </button>
        <div className="space-y-2">
          {ratingOptions.map((option, index) => (
            <button
              key={index}
              onClick={() => handleFilterChange({ rating: selectedRating === option.value ? null : option.value })}
              className={`flex w-full items-center gap-2 rounded-lg p-2 transition-colors ${
                selectedRating === option.value ? "bg-primary/20" : "hover:bg-muted"
              }`}
            >
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(option.value) ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground"
                  }`}
                />
              ))}
              <span className="text-sm font-medium">{option.label}</span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}
