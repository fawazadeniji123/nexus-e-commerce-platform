"use client"

import Link from "next/link"
import { ShoppingCart, ChevronDown } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [cartCount] = useState(0)

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
            <span className="text-xl font-bold text-primary-foreground">N</span>
          </div>
          <span className="text-xl font-bold">Nexus</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/" className="text-sm font-medium text-foreground transition-colors hover:text-primary">
            Home
          </Link>
          <button className="flex items-center gap-1 text-sm font-medium text-foreground transition-colors hover:text-primary">
            Shop <ChevronDown className="h-4 w-4" />
          </button>
          <button className="flex items-center gap-1 text-sm font-medium text-foreground transition-colors hover:text-primary">
            Categories <ChevronDown className="h-4 w-4" />
          </button>
          <Link href="/about" className="text-sm font-medium text-foreground transition-colors hover:text-primary">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium text-foreground transition-colors hover:text-primary">
            Contact
          </Link>
        </nav>

        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {cartCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              {cartCount}
            </span>
          )}
        </Button>
      </div>
    </header>
  )
}
