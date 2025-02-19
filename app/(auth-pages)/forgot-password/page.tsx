import Link from "next/link";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/submit-button";
import { FormMessage, Message } from "@/components/form-message";

import { forgotPasswordAction } from "@/app/actions";

export default async function ForgotPassword(props: { searchParams: Promise<Message>; }) {
    const searchParams = await props.searchParams;

    return (
        <>
            <form className="flex-1 flex flex-col w-full gap-2 text-foreground [&>input]:mb-6 min-w-64 max-w-64 mx-auto">
                <div>
                    <h1 className="text-2xl font-medium">Redefinir senha</h1>
                    
                    <p className="text-sm text-secondary-foreground">
                        Já tem uma conta?{" "}
                        <Link className="text-primary underline" href="/sign-in">
                            Entrar
                        </Link>
                    </p>
                </div>

                <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
                    <Label htmlFor="email">Email</Label>
                    <Input name="email" placeholder="eletrocast@exemplo.com" required />

                    <SubmitButton formAction={forgotPasswordAction}>
                        Redefinir senha
                    </SubmitButton>

                    <FormMessage message={searchParams} />
                </div>
            </form>
        </>
    );
}