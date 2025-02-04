import { Header } from "./components/Header";
import { VideoPlayer } from "./components/VideoPlayer";
import { ChatInterface } from "./components/ChatInterface";

export default function Home() {
    return (
        <div className="min-h-screen bg-[#0E0E10]">
            <Header />
            <div className="flex">
                <main className="flex-1 p-4">
                    <div className="container mx-auto">
                        <div className="grid grid-cols lg:grid-cols-3 gap-4">
                            <div className="lg:col-span-2">
                                <VideoPlayer />
                                <div className="mt-4">
                                    <h2 className="text-2xl font-bold text-white">Titulo</h2>
                                    <p className="text-gray-400">Participante</p>
                                    <p className="mt-2 text-white">
                                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum at ullam dolore mollitia sed voluptate porro repellat, veniam, est saepe ex consectetur. Consequuntur pariatur modi, ipsam amet odio aperiam iste.
                                    </p>
                                </div>
                            </div>
                            <div className="lg:col-span-1 h-[calc(100vh-5rem)]">
                                <ChatInterface />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
