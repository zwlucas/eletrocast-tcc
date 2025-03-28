import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { NotificationProvider } from "@/components/notification-provider"
import { VideoActions } from "@/components/video-actions"
import { SubscribeButton } from "@/components/subscribe-button"
import { ChatForm } from "@/components/chat-form"
import { WelcomeToast } from "@/components/welcome-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatCount, formatRelativeTime, getChannelDetails, getVideoComments, getChannelLatestVideoOrLiveStream, getVideoDetails, YouTubeChannel, YouTubeCommentThread, YouTubeVideo } from "@/lib/youtube"
import { LiveBadge } from "@/components/live-badge"
import { Button } from "@/components/ui/button"
import { VideoPlayer } from "@/components/video-player"

export default async function Home() {
    try {
        const channelId = "UC-etkvWQOz3vkon1505s1yQ";
    
        const { videoId, isLive } = await getChannelLatestVideoOrLiveStream(channelId)
        const video = await getVideoDetails(videoId)
        const channel = await getChannelDetails(channelId)
        const comments = await getVideoComments(videoId, 50)

        return (
            <>
                <NotificationProvider />
                <WelcomeToast />

                {/* Main Content */}
                <main className="flex-1 max-w-[1400px] w-full mx-auto p-4 lg:p-6 -mt-40">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Video and Info Section */}
                            <div className="lg:col-span-2 space-y-4 lg:space-y-6">
                                {/* Video Player */}
                                <VideoPlayer videoId={videoId} title={video.snippet.title} isLive={isLive} />

                                {/* Mobile Tabs */}
                                <div className="lg:hidden">
                                    <Tabs defaultValue="info" className="w-full">
                                        <TabsList className="w-full">
                                            <TabsTrigger value="info" className="flex-1">
                                                Informações
                                            </TabsTrigger>
                                            <TabsTrigger value="chat" className="flex-1">
                                                {isLive ? "Chat ao vivo" : "Comentários"}
                                            </TabsTrigger>
                                        </TabsList>
                                        <TabsContent value="info" className="mt-4">
                                            <VideoInfo video={video} channel={channel} isLive={isLive} />
                                        </TabsContent>
                                        <TabsContent value="chat" className="mt-4">
                                            <CommentSection comments={comments} isLive={isLive} />
                                        </TabsContent>
                                    </Tabs>
                                </div>

                                {/* Desktop Video Info */}
                                <div className="hidden lg:block">
                                    <VideoInfo video={video} channel={channel} isLive={isLive} />
                                </div>
                            </div>

                            {/* Desktop Chat Section */}
                            <div className="hidden lg:block lg:col-span-1">
                                <CommentSection comments={comments} isLive={isLive} />
                            </div>
                        </div>
                </main>
            </>
        );
    } catch (error) {
        console.error("Error loading YouTube data:", error)
        return <ErrorDisplay error={error as Error} />
    }
}

function VideoInfo({ video, channel, isLive }: { video: YouTubeVideo, channel: YouTubeChannel, isLive: boolean }) {	
    const publishedDate = formatRelativeTime(video.snippet.publishedAt)
    const viewCount = formatCount(video.statistics.viewCount)
    const likeCount = formatCount(video.statistics.likeCount)
    const subscriberCount = formatCount(channel.statistics.subscriberCount)

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <h1 className="text-xl lg:text-2xl font-semibold">{video.snippet.title}</h1>
                {isLive && <LiveBadge />}
            </div>
    
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Avatar>
                        <AvatarImage src={channel.snippet.thumbnails.default.url} />
                        <AvatarFallback>EC</AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="font-medium">{channel.snippet.title}</h3>
                        <p className="text-sm text-muted-foreground">{subscriberCount} inscritos</p>
                    </div>
                    <SubscribeButton />
                </div>
    
                <VideoActions likes={likeCount} dislikes={0} />
            </div>
    
            {/* Description */}
            <div className="bg-muted/50 rounded-lg p-4">
                <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                        {viewCount} visualizações • {isLive ? "Ao vivo agora" : `Publicado ${publishedDate}`}
                    </p>
                    <p className="text-sm">{video.snippet.description}</p>
                </div>
            </div>
        </div>
    )
}
  
function CommentSection({ comments, isLive }: { comments: YouTubeCommentThread[], isLive: boolean }) {
    return (
        <div className="bg-muted/50 rounded-lg h-[400px] lg:h-[calc(100vh-200px)] flex flex-col lg:w-[400px]">
            <div className="p-4 border-b border-muted flex items-center justify-between">
                <h3 className="font-medium">{isLive ? "Chat ao vivo" : `Comentários (${comments.length})`}</h3>
                {isLive && <LiveBadge />}
            </div>
    
            <ScrollArea className="flex-1 p-3 md:p-4">
                <div className="space-y-4">
                    {comments.length > 0 ? (
                        comments.map((commentThread) => {
                            const comment = commentThread.snippet.topLevelComment
    
                            return (
                                <div key={commentThread.id} className="flex items-start gap-2">
                                    <Avatar className="w-8 h-8">
                                        <AvatarImage src={comment.snippet.authorProfileImageUrl} />
                                        <AvatarFallback>{comment.snippet.authorDisplayName[0]}</AvatarFallback>
                                    </Avatar>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm font-medium">{comment.snippet.authorDisplayName}</p>
                                            <p className="text-xs text-muted-foreground">{formatRelativeTime(comment.snippet.publishedAt)}</p>
                                        </div>
                                        <p className="text-sm text-muted-foreground">{comment.snippet.textDisplay}</p>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-muted-foreground">
                                {isLive ? "Ninguém está conversando no momento. Seja o primeiro a enviar uma mensagem!"
                                    : "Nenhum comentário encontrado. Seja o primeiro a comentar!"}
                            </p>
                        </div>
                    )}
                </div>
            </ScrollArea>
    
            <div className="p-4 border-t border-muted">
                <ChatForm isLive={isLive} />
            </div>
        </div>
    )
}

function ErrorDisplay({ error }: { error: Error }) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background">
            <div className="max-w-md w-full bg-muted/50 rounded-lg p-6 text-center space-y-4">
                <h1 className="text-2xl font-bold">Erro ao carregar dados</h1>
                <p className="text-muted-foreground">Não foi possível carregar os dados do YouTube. Por favor, tente novamente mais tarde.</p>
                <p className="text-sm text-red-500">{error.message}</p>
                <Button onClick={() => window.location.reload()}>Tentar novamente</Button>
            </div>
        </div>
    )
}