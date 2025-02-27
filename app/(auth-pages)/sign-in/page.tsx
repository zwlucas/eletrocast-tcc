// import Link from "next/link";

import { FcGoogle } from "react-icons/fc";
// import { FaDiscord, FaGithub } from "react-icons/fa";

// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { SubmitButton } from "@/components/submit-button";
// import { FormMessage, Message } from "@/components/form-message";

import { /* signInAction, */ signGoogle/* , signGithub, signDiscord */ } from "@/app/actions";

export default async function Login(/* props: { searchParams: Promise<Message> } */) {
    // const searchParams = await props.searchParams;

    return (
        <>
            <form className="flex-1 flex flex-col min-w-64 mt-8 w-full max-w-sm">
                {/* <h1 className="text-2xl font-medium">Entrar</h1> */}
                {/* <p className="text-sm text-foreground">
                    Não tem uma conta?{" "}
                    <Link className="text-foreground font-medium underline" href="/sign-up">
                        Cadastre-se
                    </Link>
                </p>

                <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
                    <Label htmlFor="email">Email</Label>
                    <Input name="email" placeholder="eletrocast@examplo.com" required />

                    <div className="flex justify-between items-center">
                        <Label htmlFor="password">Senha</Label>
                        <Link className="text-xs text-foreground underline" href="/forgot-password">
                            Esqueceu sua senha?
                        </Link>
                    </div>

                    <Input type="password" name="password" placeholder="Sua senha" required />

                    <SubmitButton pendingText="Entrando..." formAction={signInAction}>
                        Entrar
                    </SubmitButton>

                    <FormMessage message={searchParams} />
                </div> */}

                <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
                    <Button className="flex items-center gap-2" onClick={signGoogle} variant={"default"}>
                        Entrar com o Google <FcGoogle className="text-2xl" />
                    </Button>
                </div>
            </form>

            {/* <div className="flex justify-center gap-2 w-full">
                <Button className="p-2 rounded-full border" onClick={signGoogle} variant={"outline"}>
                    <FcGoogle className="text-2xl" />
                </Button>

                <Button className="p-2 rounded-full border" onClick={signGithub} variant={"outline"}>
                    <FaGithub className="text-2xl" />
                </Button>

                <Button className="p-2 rounded-full border" onClick={signDiscord} variant={"outline"}>
                    <FaDiscord className="text-2xl" />
                </Button>
            </div> */}
        </>
    );
}