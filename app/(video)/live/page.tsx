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
        </>
    );
}