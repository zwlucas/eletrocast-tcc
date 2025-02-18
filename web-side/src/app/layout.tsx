import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Eletrocast',
  description: 'Created by zucas',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}