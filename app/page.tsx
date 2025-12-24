import { HeroSection } from "@/components/hero-section"
import { ProductFilters } from "@/components/product-filters"
import { ProductCard } from "@/components/product-card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getProducts, getCategories } from "@/app/actions/products"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const categories = await getCategories()

  const filters = {
    minPrice: params.minPrice ? Number(params.minPrice) : undefined,
    maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
    categories: params.categories
      ? Array.isArray(params.categories)
        ? params.categories
        : [params.categories]
      : undefined,
    rating: params.rating ? Number(params.rating) : undefined,
  }

  const products = await getProducts(filters)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container px-4 py-8">
        <HeroSection />

        <div className="mt-12 grid gap-8 lg:grid-cols-[280px_1fr]">
          <div className="lg:sticky lg:top-8 lg:h-fit">
            <h2 className="mb-4 text-xl font-bold">Dynamic Filter</h2>
            <ProductFilters categories={categories} onFilterChange={() => {}} />
          </div>

          <div>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Featured Products</h2>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full border border-border">
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full border border-border">
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {products.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-border bg-card p-12 text-center">
                <p className="text-muted-foreground">No products found matching your filters.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
