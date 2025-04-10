"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createClient } from "@/lib/supabase/client";
import { formatRelativeTime } from "@/lib/youtube";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

interface NewCommentProps {
  text: string;
}

export function NewComment({ text }: NewCommentProps) {
  const [user, setUser] = useState<User | null>(null);
  
  const fetchUser = async () => {
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user);
  };

  useEffect(() => {
    fetchUser();
  });

  if (!user) return null;

  return (
    <div className="flex items-start gap-2 border-l-2 border-blue-500 pl-2 animate-fadeIn">
      <Avatar className="w-8 h-8">
        <AvatarImage src={user.user_metadata.avatar_url} />
        <AvatarFallback>
          {user.user_metadata.name?.[0] || user.email?.[0]}
        </AvatarFallback>
      </Avatar>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium">
            {user.user_metadata.name || user.email}
          </p>
          <p className="text-xs text-muted-foreground">
            {formatRelativeTime(new Date().toISOString())}
          </p>
        </div>
        <p className="text-sm text-muted-foreground">{text}</p>
      </div>
    </div>
  );
}
