"use client"

import { useEffect, useState } from 'react'
import type { User } from "@supabase/supabase-js"
import { supabase } from "@/app/lib/supabase"

type Message = {
    id: string
    user_id: string
    content: string
    created_at: string
    user_email: string
}

export function ChatInterface({ user }: { user: User | undefined }) {
    const [messages, setMessages] = useState<Message[]>([])
    const [newMessage, setNewMessage] = useState('')

    useEffect(() => {
        const fetchMessages = async () => {
          const { data, error } = await supabase.from("messages").select("*").order("created_at", { ascending: true })
    
          if (error) console.error("Error fetching messages:", error)
          else setMessages(data || [])
        }
    
        fetchMessages()
    
        const channel = supabase
          .channel("realtime messages")
          .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages" }, (payload) => {
            setMessages((prevMessages) => [...prevMessages, payload.new as Message])
          })
          .subscribe()
    
        return () => {
          supabase.removeChannel(channel)
        }
      }, [supabase])
    
      const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!newMessage.trim() || !user || !user.email || !user.id) return

        const { error } = await supabase.from("messages").insert({
            content: newMessage,
            user_id: user.id,
            user_email: user.email,
        })
    
        if (error) console.error("Error sending message:", error)
        else setNewMessage("")
      }
    
    return (
        <div className="flex flex-col h-[calc(100vh-100px)]">
            <div className="flex-1 overflow-y-auto mb-4 p-4 border rounded-lg">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`mb-2 p-2 rounded-lg ${message.user_id === user?.id ? "bg-blue-100 text-right" : "bg-gray-100"}`}
                    >
                        <p className="font-bold">{message.user_email}</p>
                        <p>{message.content}</p>
                    </div>
                ))}
            </div>
            {user ? (
                <form onSubmit={handleSendMessage} className="flex gap-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1 p-2 border rounded"
                        placeholder="Digite sua mensagem..."
                    />
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                        Enviar
                    </button>
                </form>
            ) : (
                <div className='text-center p-4 bg-gray-100 rounded-lg'>
                    <p className='mb-2'>Por favor faça login para enviar uma mensagem</p>
                </div>
            )}
        </div>
    )
}