"use client"

import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { X } from "lucide-react"

export function NotificationProvider() {
  return <Toaster closeButton richColors expand visibleToasts={6} />
}

export function showNotification(
  title: string,
  description?: string,
  type: "default" | "success" | "error" | "warning" | "info" = "default",
) {
  const options = {
    description,
    dismissible: true,
    action: {
      label: "Fechar",
      onClick: () => {},
    },
    icon: <X className="w-4 h-4" />,
  }

  switch (type) {
    case "success":
      toast.success(title, options)
      break
    case "error":
      toast.error(title, options)
      break
    case "warning":
      toast.warning(title, options)
      break
    case "info":
      toast.info(title, options)
      break
    default:
      toast(title, options)
  }
}