"use client"

import { Button } from "@/components/ui/button"
import { useEffect } from "react"

export default function Error({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
    useEffect(() => {
        console.error(error)
    }, [error])
    
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 -mt-40">
            <div className="text-center space-y-4">
                <h2 className="text-2xl font-semibold">Algo deu errado!</h2>
                <p className="text-muted-foreground">Desculpe, não foi possível carregar o conteúdo.</p>
                <Button onClick={reset}>Tentar novamente</Button>
            </div>
        </div>
    )
}

