import { Button } from "@/components/ui/button"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-card via-card/95 to-primary/20 px-8 py-16 md:px-16">
      <div className="relative z-10 grid gap-8 md:grid-cols-2 md:items-center">
        <div>
          <h1 className="mb-2 text-4xl font-bold text-balance md:text-5xl lg:text-6xl">New Arrivals:</h1>
          <h2 className="mb-6 text-3xl font-bold text-balance text-muted-foreground md:text-4xl lg:text-5xl">
            Modern Tech Essentials
          </h2>
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            Shop Now
          </Button>
        </div>

        <div className="relative flex items-center justify-center gap-4">
          <div className="relative h-64 w-96 md:h-80 md:w-[450px]">
            <Image src="/laptop-with-blue-wallpaper.jpg" alt="Modern Laptop" fill className="object-contain" priority />
          </div>
          <div className="relative h-48 w-32 md:h-64 md:w-40">
            <Image src="/smartphone-iphone.jpg" alt="Smartphone" fill className="object-contain" priority />
          </div>
        </div>
      </div>
    </section>
  )
}
