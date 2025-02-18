"use client"

import { useEffect, useRef } from "react"
import Hls from "hls.js"

export function VideoPlayer() {
    const videoRef = useRef<HTMLVideoElement | null>(null)

    useEffect(() => {
        const video = videoRef.current

        if (!video) return

        if (Hls.isSupported()) {
            const hls = new Hls();

            hls.loadSource('http://localhost/hls/teste.m3u8');
            hls.attachMedia(video);

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                video.play();
            });

            return () => {
                hls.destroy()
            }
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = 'http://localhost/hls/teste.m3u8';
            video.addEventListener('loadedmetadata', function() {
                video.play();
            });

            return () => {
                video.removeEventListener('loadedmetadata', () => {
                    video.play()
                });
            };
        }
    }, []);

    return (
        <div className="aspect-video bg-black">
            <video ref={videoRef} className="w-full h-full" controls></video>
        </div>
    )
}