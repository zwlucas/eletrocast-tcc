"use client";

import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, Share2 } from "lucide-react";
import { showNotification } from "./notification-provider";

export function VideoActions({ likes, dislikes }: { likes: number | string, dislikes: number }) {
    return (
        <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" onClick={() => { showNotification("Like adicionado!"); }} >
                <ThumbsUp className="w-4 h-4 mr-2" />
                {likes}
            </Button>
            <Button variant="secondary" size="sm">
                <ThumbsDown className="w-4 h-4 mr-2" />
                {dislikes}
            </Button>
            <Button variant="secondary" size="sm"
                onClick={() => {
                    showNotification("Link copiado para a área de transferência!", "Agora você pode compartilhar este vídeo.");
                }}>
                <Share2 className="w-4 h-4 mr-2" />
                Compartilhar
            </Button>
        </div>
    );
}
