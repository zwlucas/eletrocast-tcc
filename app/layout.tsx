import "./globals.css";
import type { Metadata } from "next";
import { Geist } from "next/font/google";

import Link from "next/link";
import { ThemeProvider } from "next-themes";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
  description: "Made by Mackenzie (Lucas Faria)",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col gap-20 items-center">
              <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                <div className="w-full max-w-7xl flex justify-between items-center p-3 px-5 text-sm">
                  <div className="flex gap-5 items-center font-semibold">
                    <ThemeSwitcher />
                    <Link href={"/"}>Eletrocast</Link>
                  </div>

                  <HeaderAuth />
                </div>
              </nav>

              <div className="flex flex-col gap-20 max-w-5xl p-5">
                {children}
                <SpeedInsights />
              </div>
            </div>
          </main>

          <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-8">
            <p>
              Made by{" "}
              <a
                href="https://www.instagram.com/lucas.fariamo/"
                className="font-bold hover:underline"
              >
                Mackenzie (Lucas Faria)
              </a>
            </p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
