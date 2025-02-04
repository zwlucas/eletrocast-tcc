"use client"

import { useState } from 'react'
import { Input } from "@/app/components/ui/input"
import { Button } from "@/app/components/ui/button"

export function ChatInterface() {
    const [messages, setMessages] = useState([
        { user: 'Fulano', message: 'Opa!' },
        { user: 'Ciclano', message: 'Salve!' },
        { user: 'Deltrano', message: 'Teste!' },
    ])
    const [newMessage, setNewMessage] = useState('')
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (newMessage.trim()) {
            setMessages([...messages, { user: 'Você', message: newMessage }])
            setNewMessage('')
        }
    }
    
    return (
        <div className="bg-[#18181b] text-white h-full flex flex-col">
            <div className="flex-1 overflow-y-auto p-4">
                {messages.map((msg, index) => (
                    <div key={index} className="mb-2">
                    <span className="font-bold">{msg.user}: </span>
                    <span>{msg.message}</span>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700">
                <div className="flex">
                    <Input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Envie uma mensagem"
                        className="flex-1 bg-gray-700 text-white"
                    />
                        <Button type="submit" className="ml-2">
                            Enviar
                    </Button>
                </div>
            </form>
        </div>
    )
}