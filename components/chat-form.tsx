"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

export function ChatForm({ isLive = false }: { isLive?: boolean }) {
  return (
    <form
      className="flex gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        const input = e.currentTarget.elements.namedItem(
          "message"
        ) as HTMLInputElement;
        if (input.value.trim()) {
          input.value = "";
        }
      }}
    >
      <Input
        name="message"
        placeholder={
          isLive ? "Envie uma mensagem..." : "Adicione um comentário..."
        }
        className="flex-1"
      />
      <Button type="submit" size="icon">
        <Send className="w-4 h-4" />
      </Button>
    </form>
  );
}
