"use client"

import { useEffect } from "react"
import { showNotification } from "./notification-provider"

export function WelcomeToast() {
  useEffect(() => {
    showNotification(
      "Bem-vindo ao Eletrocast! 👋",
      "Essa página se encontra em desenvolvimento.",
    )
  }, [])

  return null
}

