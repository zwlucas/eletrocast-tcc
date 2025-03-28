"use client"

import { Button } from "@/components/ui/button"
import { showNotification } from "./notification-provider"

export function SubscribeButton() {
  return (
    <Button
      className="ml-4"
      onClick={() => {
        showNotification("Inscrito com sucesso!", "Você receberá notificações sobre novos conteúdos.")
      }}
    >
      Inscrever-se
    </Button>
  )
}

