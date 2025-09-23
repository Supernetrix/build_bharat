import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { Unbounded, Space_Grotesk } from "next/font/google"
import "./globals.css"

const unbounded = Unbounded({
    subsets: ["latin"],
    variable: "--font-unbounded",
    weight: ["400", "700", "800"],
})

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    variable: "--font-space-grotesk",
    weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
    title: "Gaming Dashboard",
    description: "Mobile gaming dashboard with React Nice Avatar",
    generator: "v0.app",
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
        <body
            className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${unbounded.variable} ${spaceGrotesk.variable}`}
        >
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
        </body>
        </html>
    )
}
