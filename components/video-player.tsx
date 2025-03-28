"use client";

import { useState, useEffect, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { showNotification } from "./notification-provider";
import { LiveBadge } from "./live-badge";

interface VideoPlayerProps {
    videoId: string;
    title: string;
    isLive?: boolean;
}

export function VideoPlayer({ videoId, title, isLive = false }: VideoPlayerProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    
    useEffect(() => {
        const handleIframeLoad = () => {
            setIsLoading(false);
            showNotification(
                isLive ? "Transmissão ao vivo carregada" : "Vídeo carregado",
                "Aproveite o conteúdo!"
            );
        };
        
        const handleIframeError = () => {
            setIsLoading(false);
            setHasError(true);
            showNotification(
                isLive ? "Erro ao carregar a transmissão" : "Erro ao carregar o vídeo",
                "Tente recarregar a página ou verifique sua conexão.",
                "error"
            );
        };
        
        const iframe = iframeRef.current;
        if (iframe) {
            iframe.addEventListener("load", handleIframeLoad);
            iframe.addEventListener("error", handleIframeError);
            
            return () => {
                iframe.removeEventListener("load", handleIframeLoad);
                iframe.removeEventListener("error", handleIframeError);
            };
        }
    }, [isLive]);
    
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1${isLive ? "&enablejsapi=1" : ""}`;
    
    return (
        <div className="aspect-video bg-muted rounded-lg overflow-hidden relative">
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <Skeleton className="w-full h-full absolute" />
                    <div className="z-10 text-center">
                        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
                        <p className="text-sm">
                            {isLive ? "Carregando transmissão ao vivo..." : "Carregando vídeo..."}
                        </p>
                        {isLive && (
                            <div className="mt-2">
                                <LiveBadge />
                            </div>
                        )}
                    </div>
                </div>
            )}
            
            {hasError ? (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-4">
                        <p className="text-lg font-medium mb-2">
                            {isLive ? "Erro ao carregar a transmissão" : "Erro ao carregar o vídeo"}
                        </p>
                        <p className="text-sm text-muted-foreground mb-4">
                            {isLive
                                ? "Não foi possível reproduzir a transmissão ao vivo. Verifique sua conexão ou tente novamente mais tarde."
                                : "Não foi possível reproduzir o vídeo. Verifique sua conexão ou tente novamente mais tarde."}
                        </p>
                        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md" onClick={() => window.location.reload()}>
                            Tentar novamente
                        </button>
                    </div>
                </div>
            ) : (
                <iframe ref={iframeRef} className="w-full h-full" src={embedUrl} title={title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen style={{ opacity: isLoading ? 0 : 1 }}></iframe>
            )}
        </div>
    );
}            