"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Toaster } from "@/components/ui/sonner";
import { ThumbsUp, ThumbsDown, Share2, Send } from "lucide-react"
import { useEffect } from "react";
import { toast } from "sonner";

export default function Live() {
    useEffect(() => {
        toast("Bem-vindo ao Eletrocast! 👋", {
            description: "Essa pagina está em desenvolvimento",
            duration: 5000,
        })
    }, [])

    return (
        <div className="gap-0">
            <Toaster />
            <main className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 p-6">
                <div className="lg:col-span-3 space-y-6">
                    <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                        <video className="w-full h-full" controls>
                            <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                        </video>
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-2xl font-semibold">Eletrocast #1 - Entrevista com o prefeito de Mococa, Barison</h1>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div>
                                    <h3 className="font-medium">Eletrocast</h3>
                                    <p className="text-sm text-muted-foreground">50K inscritos</p>
                                </div>

                                <Button className="ml-4">
                                    Inscrever-se
                                </Button>
                            </div>

                            <div className="flex items-center gap-2">
                                <Button variant="secondary" size="sm">
                                    <ThumbsUp className="w-4 h-4 mr-2" />
                                    12K
                                </Button>
                                <Button variant="secondary" size="sm">
                                    <ThumbsDown className="w-4 h-4 mr-2" />
                                    24
                                </Button>
                                <Button variant="secondary" size="sm">
                                    <Share2 className="w-4 h-4 mr-2" />
                                    Compartilhar
                                </Button>
                            </div>
                        </div>

                        <div className="bg-muted/50 rounded-lg p-4">
                            <div className="space-y-2">
                                <p className="text-sm text-muted-foreground">
                                    42,104 visualizações • Transmitido há 2 horas
                                </p>
                                <p className="text-sm">
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam ducimus, aliquid libero provident dignissimos fugiat animi corrupti aperiam cum totam amet debitis nulla ex, at error, esse sequi possimus voluptate?
                                    Atque, asperiores dolorum doloremque, autem libero mollitia enim delectus officiis consectetur iure unde quisquam totam. Aut cum minima quas voluptatibus in error, neque tenetur ratione porro? Animi vero fugit commodi!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1 space-y-4">
                    <div className="bg-muted/50 rounded-lg h-[450px] flex flex-col w-full lg:w-[350px]">
                        <div className="p-4 border-b border-muted">
                            <h3 className="font-medium">
                                Chat ao vivo
                            </h3>
                        </div>

                        <ScrollArea className="flex-1 p-4">
                            <div className="space-y-4">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <div key={i} className="flex items-start gap-2">
                                        {/* avatar */}

                                        <div className="space-y-1">
                                            <p className="text-sm font-medium">
                                                Usuário {i + 1}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                Top de mais!
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>

                        <div className="p-4 border-t border-muted">
                            <div className="flex gap-2">
                                <Input placeholder="Sua mensagem..." />
                                <Button size={"icon"}>
                                    <Send />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}