"use client"

import { useEffect } from "react"
import { showNotification } from "./notification-provider"

export function WelcomeToast() {
  useEffect(() => {
    showNotification(
      "Bem-vindo ao Eletrocast! 👋",
      "Fique à vontade para participar do chat e interagir com a comunidade.",
    )
  }, [])

  return null
}

