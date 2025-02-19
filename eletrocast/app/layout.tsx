import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";

import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";

import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

const geistSans = Geist({
    display: "swap",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    metadataBase: new URL(defaultUrl),
    title: "Eletrocast",
    description: "Podcast website",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={geistSans.className} suppressHydrationWarning>
            <body className='bg-background text-foreground'>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                
                <main className="min-h-screen flex flex-col items-center">
                    <div className="flex-1 w-full flex flex-col gap-20 items-center">
                        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                            <div className="w-full max-w-7xl flex justify-between items-center p-3 px-5 text-sm">
                                <div className="flex gap-5 items-center font-semibold">
                                    <ThemeSwitcher />
                                    <Link href={"/"}>Eletrocast</Link>
                                </div>
                                
                                {!hasEnvVars ? <p>Setup your vars</p> : <HeaderAuth />}
                            </div>
                        </nav>
                        
                        <div className="flex flex-col gap-20 max-w-5xl p-5">
                            {children}
                        </div>
                    </div>
                </main>

                </ThemeProvider>
            </body>
        </html>
    );
}
