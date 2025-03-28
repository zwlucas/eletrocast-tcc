"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"
import { showNotification } from "./notification-provider"

export function ChatForm() {
  return (
    <form
      className="flex gap-2"
      onSubmit={(e) => {
        e.preventDefault()
        const input = e.currentTarget.elements.namedItem("message") as HTMLInputElement
        if (input.value.trim()) {
          showNotification("Mensagem enviada!")
          input.value = ""
        }
      }}
    >
      <Input name="message" placeholder="Envie uma mensagem..." className="flex-1" />
      <Button type="submit" size="icon">
        <Send className="w-4 h-4" />
      </Button>
    </form>
  )
}

