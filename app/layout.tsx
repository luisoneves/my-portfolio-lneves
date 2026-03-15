import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider"
import { PageTransition } from "@/components/providers/PageTransition"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { CommandPalette } from "@/components/CommandPalette"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Luis Neves — Engineering Lead · Software Architect",
  description:
    "Fullstack com arquitetura-primeiro. 15+ anos de TI. Diocese SaaS, multi-tenancy, monorepo. FATEC ADS.",
  openGraph: {
    title: "Luis Neves — Engineering Lead",
    description: "Não escrevo features. Estruturo sistemas.",
    url: "https://dev-luisneves.me",
    siteName: "Luis Neves",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luis Neves — Engineering Lead",
    description: "Não escrevo features. Estruturo sistemas.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SmoothScrollProvider>
          <Navbar />
          <CommandPalette />
          <PageTransition>
            {children}
          </PageTransition>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
