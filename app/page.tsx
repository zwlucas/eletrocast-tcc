import Hero from "@/components/hero";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
    return (
        <>
            <Hero />
            
            <main className="flex-1 flex flex-col gap-6 px-4">
                {/* <h2 className="font-medium text-xl mb-4">Quem somos?</h2> */}
                <Button asChild size="sm" variant="default">
                    <Link href="/live">Assista o podcast</Link>
                </Button>
            </main>
        </>
    );
}
