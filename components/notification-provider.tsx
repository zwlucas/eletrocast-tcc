"use client"

import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"

export function NotificationProvider() {
  return <Toaster closeButton richColors expand visibleToasts={6} />
}

export function showNotification(title: string, description?: string) {
  toast(title, {
    description,
    dismissible: true,
    action: {
      label: "Fechar",
      onClick: () => {},
    },
  })
}

