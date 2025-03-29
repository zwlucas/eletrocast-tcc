"use client";

import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, Share2 } from "lucide-react";

export function VideoActions({
  likes,
  dislikes,
}: {
  likes: number | string;
  dislikes: number;
}) {
  return (
    <div className="flex items-center gap-2">
      <Button variant="secondary" size="sm">
        <ThumbsUp className="w-4 h-4 mr-2" />
        {likes}
      </Button>
      <Button variant="secondary" size="sm">
        <ThumbsDown className="w-4 h-4 mr-2" />
        {dislikes}
      </Button>
      <Button variant="secondary" size="sm">
        <Share2 className="w-4 h-4 mr-2" />
        Compartilhar
      </Button>
    </div>
  );
}
