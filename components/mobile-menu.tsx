"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

export function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px]">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="mt-4 space-y-4">
          <Button variant="ghost" className="w-full justify-start" asChild>
            <a href="#">Início</a>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <a href="#">Explorar</a>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <a href="#">Biblioteca</a>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <a href="#">Histórico</a>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

