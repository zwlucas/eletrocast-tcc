import Link from "next/link";

import { Button } from "./ui/button";

import { createClient } from "@/utils/supabase/server";
import { signOutAction } from "@/app/actions";

export default async function AuthButton() {
    const supabase = await createClient();

    const { data: { user }, } = await supabase.auth.getUser();

    return user ? (
        <div className="flex items-center gap-4">
            Olá, {user.user_metadata?.name || user.user_metadata?.user_name || user.email}

            <form action={signOutAction}>
                <Button type="submit" variant="outline">
                    Sair
                </Button>
            </form>
        </div>
    ) : (
        <div className="flex gap-2">
            
            {/* <Button asChild size="sm" variant="outline">
                <Link href="/sign-in">Entrar</Link>
            </Button>
            <Button asChild size="sm" variant="default">
                <Link href="/sign-up">Cadastrar-se</Link>
            </Button> */}

            <Button asChild size="sm" variant="default">
                <Link href="/sign-in">Entrar</Link>
            </Button>
        </div>
    );
}