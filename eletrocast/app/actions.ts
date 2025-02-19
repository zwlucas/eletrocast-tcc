"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signUpAction = async (formData: FormData) => {
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const supabase = await createClient();
    const origin = (await headers()).get("origin");
    
    if (!email || !password) {
        return encodedRedirect(
            "error",
            "/sign-up",
            "Email e senha são obrigatórios",
        );
    }
    
    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${origin}/auth/callback`,
        },
    });
    
    if (error) {
        console.error(error.code + " " + error.message);
        return encodedRedirect("error", "/sign-up", error.message);
    } else {
        return encodedRedirect(
            "success",
            "/sign-up",
            "Obrigado por se inscrever! Verifique seu e-mail para obter um link de verificação.",
        );
    }
};

export const signInAction = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = await createClient();
    
    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    
    if (error) {
        return encodedRedirect("error", "/sign-in", error.message);
    }
    
    return redirect("/");
};

export const signGoogle = async () => {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
    });

    if (error) {
        return encodedRedirect("error", "/sign-in", error.message);
    }

    return redirect("/");
}

export const forgotPasswordAction = async (formData: FormData) => {
    const email = formData.get("email")?.toString();
    const supabase = await createClient();
    const origin = (await headers()).get("origin");
    const callbackUrl = formData.get("callbackUrl")?.toString();
    
    if (!email) {
        return encodedRedirect("error", "/forgot-password", "O email é obrigatório");
    }
    
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
    });
    
    if (error) {
        console.error(error.message);
        return encodedRedirect(
            "error",
            "/forgot-password",
            "Não foi possível redefinir a senha",
        );
    }
    
    if (callbackUrl) {
        return redirect(callbackUrl);
    }
    
    return encodedRedirect(
        "success",
        "/forgot-password",
        "Verifique seu e-mail para obter um link para redefinir sua senha.",
    );
};

export const resetPasswordAction = async (formData: FormData) => {
    const supabase = await createClient();
    
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    
    if (!password || !confirmPassword) {
        encodedRedirect(
            "error",
            "/protected/reset-password",
            "Senha e confirmação de senha são obrigatórias",
        );
    }
    
    if (password !== confirmPassword) {
        encodedRedirect(
            "error",
            "/protected/reset-password",
            "As senhas não coincidem",
        );
    }
    
    const { error } = await supabase.auth.updateUser({
        password: password,
    });
    
    if (error) {
        encodedRedirect(
            "error",
            "/protected/reset-password",
            "Falha na atualização da senha",
        );
    }
    
    encodedRedirect("success", "/protected/reset-password", "Senha atualizada");
};

export const signOutAction = async () => {
    const supabase = await createClient();
    await supabase.auth.signOut();
    return redirect("/sign-in");
};