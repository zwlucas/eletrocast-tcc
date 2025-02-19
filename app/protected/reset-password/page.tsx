import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/submit-button";
import { FormMessage, Message } from "@/components/form-message";

import { resetPasswordAction } from "@/app/actions";

export default async function ResetPassword(props: { searchParams: Promise<Message>; }) {
    const searchParams = await props.searchParams;

    return (
        <form className="flex flex-col w-full max-w-md p-4 gap-2 [&>input]:mb-4">
            <h1 className="text-2xl font-medium">Redefinir senha</h1>

            <p className="text-sm text-foreground/60">
                Por favor, insira sua nova senha abaixo.
            </p>

            <Label htmlFor="password">Nova senha</Label>
            <Input type="password" name="password" placeholder="Nova senha" required />

            <Label htmlFor="confirmPassword">Confirmar senha</Label>
            <Input type="password" name="confirmPassword" placeholder="Confirmar senha" required />

            <SubmitButton formAction={resetPasswordAction}>
                Redefinir senha
            </SubmitButton>

            <FormMessage message={searchParams} />
        </form>
    );
}