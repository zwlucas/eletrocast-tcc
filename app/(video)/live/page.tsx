import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { NotificationProvider } from "@/components/notification-provider"
import { VideoActions } from "@/components/video-actions"
import { SubscribeButton } from "@/components/subscribe-button"
import { ChatForm } from "@/components/chat-form"
import { WelcomeToast } from "@/components/welcome-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type VideoDetails = {
    id: string;
    title: string;
    description: string;
    views: number;
    likes: number;
    dislikes: number;
    publishedAt: string;
};

type ChannelDetails = {
    id: string;
    name: string;
    avatar: string;
    subscribers: number;
};

type ChatMessage = {
    id: string;
    user: {
        id: string;
        name: string;
        avatar: string;
    };
    message: string;
};

async function getVideoDetails(videoId: string): Promise<VideoDetails> {
    return {
        id: videoId,
        title: "Entrevista com o prefeito de Mococa, Barison!",
        description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed magna massa. Pellentesque magna elit, euismod et aliquam non, vehicula quis elit. Sed blandit dictum leo sit amet vehicula. Integer placerat ut enim quis congue. Duis nec neque vitae nisl feugiat maximus non ut odio. Etiam ultrices luctus odio non volutpat. Cras sed magna sit amet nulla pharetra bibendum.",
        views: 1234567,
        likes: 12345,
        dislikes: 123,
        publishedAt: "1 dia atras",
    };
}

async function getChannelDetails(): Promise<ChannelDetails> {
    return {
        id: "channel-1",
        name: "Eletrocast",
        avatar: "https://github.com/shadcn.png",
        subscribers: 1000000,
    };
}

async function getChatMessages(): Promise<ChatMessage[]> {
    return [
        {
            id: "msg-1",
            user: {
                id: "user-1",
                name: "Lucas Faria",
                avatar: "https://github.com/shadcn.png",
            },
            message: "Salve!",
        },
        {
            id: "msg-2",
            user: {
                id: "user-2",
                name: "Lucas Faria",
                avatar: "https://github.com/shadcn.png",
            },
            message: "Dahora!",
        },
    ];
}

export default async function Home() {
    const videoId = "sample-video-id"
    const [video, channel, chatMessages] = await Promise.all([
        getVideoDetails(videoId),
        getChannelDetails(),
        getChatMessages(),
    ])

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
                    <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                        <video className="w-full h-full" controls>
                            <source
                                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                                type="video/mp4"
                            />
                        </video>
                    </div>

                    {/* Mobile Tabs */}
                    <div className="lg:hidden">
                        <Tabs defaultValue="info" className="w-full">
                            <TabsList className="w-full">
                                <TabsTrigger value="info" className="flex-1">
                                    Informações
                                </TabsTrigger>
                                <TabsTrigger value="chat" className="flex-1">
                                    Chat ao vivo
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="info" className="mt-4">
                                <VideoInfo video={video} channel={channel} />
                            </TabsContent>
                            <TabsContent value="chat" className="mt-4">
                                <ChatSection messages={chatMessages} />
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Desktop Video Info */}
                    <div className="hidden lg:block">
                        <VideoInfo video={video} channel={channel} />
                    </div>
                </div>

                {/* Desktop Chat Section */}
                <div className="hidden lg:block lg:col-span-1">
                    <ChatSection messages={chatMessages} />
                </div>
            </div>
      </main>
    </>
  );
}

function VideoInfo({
    video,
    channel,
  }: {
    video: VideoDetails
    channel: ChannelDetails
  }) {
    return (
      <div className="space-y-4">
        <h1 className="text-xl lg:text-2xl font-semibold">{video.title}</h1>
  
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={channel.avatar} />
              <AvatarFallback>EC</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{channel.name}</h3>
              <p className="text-sm text-muted-foreground">{channel.subscribers.toLocaleString()} inscritos</p>
            </div>
            <SubscribeButton />
          </div>
  
          <VideoActions likes={video.likes} dislikes={video.dislikes} />
        </div>
  
        {/* Description */}
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              {video.views.toLocaleString()} visualizações • Transmitido há {video.publishedAt}
            </p>
            <p className="text-sm">{video.description}</p>
          </div>
        </div>
      </div>
    )
  }
  
  function ChatSection({ messages }: { messages: ChatMessage[] }) {
    return (
      <div className="bg-muted/50 rounded-lg h-[400px] lg:h-[calc(100vh-200px)] flex flex-col">
        <div className="p-4 border-b border-muted">
          <h3 className="font-medium">Chat ao vivo</h3>
        </div>
  
        <ScrollArea className="flex-1 p-3 md:p-4">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className="flex items-start gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={msg.user.avatar} />
                  <AvatarFallback>{msg.user.name[0]}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="text-sm font-medium">{msg.user.name}</p>
                  <p className="text-sm text-muted-foreground">{msg.message}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
  
        <div className="p-4 border-t border-muted">
          <ChatForm />
        </div>
      </div>
    )
  }
