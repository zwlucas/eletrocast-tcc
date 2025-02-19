import { Bell, MessageSquare, User } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import AuthButton from "./AuthButton";
import { Session } from "@supabase/supabase-js";

export async function Header({ session }: { session: Session | null }) {
    return (
        <header className="bg-[#18181B] text-white p-2">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <a href="/" className="text-2xl font-bold text-purple-500">ELETROCAST</a>
                    <nav>
                        <ul className="flex space-x-4">
                            <li><a href="/about" className="hover:text-purple-400">Sobre</a></li>
                            <li><a href="/how" className="hover:text-purple-400">Como</a></li>
                            <li><a href="/thanks" className="hover:text-purple-400">Agradecimentos</a></li>
                        </ul>
                    </nav>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <Button variant="default" size="icon">
                            <Bell size={20} />
                        </Button>
                        <Button variant="ghost" size="icon">
                            <MessageSquare size={20} />
                        </Button>
                        <Button variant="ghost" size="icon">
                            <User size={20} />
                        </Button>
                        <AuthButton session={session} />
                    </div>
                </div>
            </div>
        </header>
    )
}