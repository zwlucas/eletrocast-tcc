import Hero from "@/components/hero";
import SignUpUserSteps from "@/components/sign-up";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";

export default async function Home() {
    return (
        <>
            <Hero />
            <main className="flex-1 flex flex-col gap-6 px-4">
                {hasEnvVars ? <SignUpUserSteps /> : <p>Set up your environment variables to continue.</p>}
            </main>
        </>
    );
}
