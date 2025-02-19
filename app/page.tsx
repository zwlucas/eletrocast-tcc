import Hero from "@/components/hero";

export default async function Home() {
    return (
        <>
            <Hero />
            
            <main className="flex-1 flex flex-col gap-6 px-4">
                <h2 className="font-medium text-xl mb-4">Quem somos?</h2>
            </main>
        </>
    );
}
