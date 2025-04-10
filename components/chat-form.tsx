"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Session, User } from "@supabase/auth-js";
import { addVideoComment, sendLiveChatMessage } from "@/lib/youtube";
import { signGoogle } from "@/app/actions";
import { showNotification } from "./notification-provider";

interface ChatFormProps {
  isLive?: boolean;
  liveChatId?: string | null;
  videoId: string;
  onCommentAdded?: (text: string) => void;
}

export function ChatForm({
  isLive = false,
  liveChatId,
  videoId,
  onCommentAdded,
}: ChatFormProps) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const fetchUser = async () => {
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user);
    const {
      data: { session },
    } = await supabase.auth.getSession();
    setSession(session);
  };

  useEffect(() => {
    fetchUser();
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) {
      showNotification(
        "Mensagem vazia",
        "Por favor, digite uma mensagem antes de enviar.",
        "warning"
      );
      return;
    }

    if (!user || !session?.access_token) {
      showNotification(
        "Login necessário",
        "Faça login com o Google para enviar mensagens no chat.",
        "info"
      );
      return;
    }

    if (!isLive || !liveChatId) {
      showNotification(
        isLive ? "Mensagem enviada!" : "Comentário enviado!",
        isLive
          ? "Sua mensagem foi adicionada ao chat."
          : "Seu comentário foi adicionado com sucesso."
      );
      setMessage("");
      return;
    }

    try {
      setIsSending(true);

      let success = false;

      if (isLive && liveChatId) {
        success = await sendLiveChatMessage(
          liveChatId,
          message,
          session.access_token
        );

        if (success) {
          showNotification(
            "Mensagem enviada!",
            "Sua mensagem foi adicionada ao chat ao vivo."
          );
        } else {
          showNotification(
            "Erro ao enviar mensagem",
            "Não foi possível enviar sua mensagem para o chat ao vivo.",
            "error"
          );
        }
      } else {
        success = await addVideoComment(videoId, message, session.access_token);

        if (success) {
          showNotification(
            "Comentário enviado!",
            "Seu comentário foi adicionado ao vídeo com sucesso."
          );

          if (onCommentAdded) {
            onCommentAdded(message);
          }
        } else {
          showNotification(
            "Erro ao enviar comentário",
            "Não foi possível adicionar seu comentário ao vídeo.",
            "error"
          );
        }
      }

      if (success) {
        setMessage("")
      }
    } catch (error) {
      console.error("Error sending message/comment:", error)
      showNotification(
        isLive ? "Erro ao enviar mensagem" : "Erro ao enviar comentário",
        "Ocorreu um erro ao tentar enviar. Por favor, tente novamente.",
        "error",
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div>
      {!user ? (
        <div className="text-center">
          <Button onClick={signGoogle} variant={"outline"} className="w-full">
            Faça login com Google para {isLive ? "participar do chat" : "comentar"}
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={
              isLive ? "Envie uma mensagem..." : "Adicione um comentário..."
            }
            className="flex-1"
            disabled={isSending}
          />
          <Button
            type="submit"
            size={"icon"}
            disabled={isSending || !message.trim()}
          >
            {isSending ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </form>
      )}
    </div>
  );
}
