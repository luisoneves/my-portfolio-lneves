import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider"
import { PageTransition } from "@/components/providers/PageTransition"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { CommandPalette } from "@/components/CommandPalette"
import { ClarityProvider } from "@/components/providers/ClarityProvider"
import { ThemeProvider } from "@/components/providers/ThemeProvider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://dev-luisneves.me"),
  title: "Luis Neves — Engineering Lead · Software Architect",
  description:
    "Fullstack com arquitetura-primeiro. 15+ anos de TI. Diocese SaaS, multi-tenancy, monorepo. FATEC ADS.",
  verification: {
    google: "LYRKoi0rwXdY7lPgurO5Z9n_bEHMZqGoEnLb-86PG6U"
  },
  openGraph: {
    title: "Luis Neves — Engineering Lead",
    description: "Não escrevo features. Estruturo sistemas.",
    url: "https://dev-luisneves.me",
    siteName: "Luis Neves",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luis Neves — Engineering Lead",
    description: "Não escrevo features. Estruturo sistemas.",
    images: ["/og-image.png"],
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
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
        {/* i18n: quando ativar, instalar next-intl e descomentar abaixo
            import { NextIntlClientProvider } from 'next-intl'
            <NextIntlClientProvider locale="pt" messages={messages}>
              {children}
            </NextIntlClientProvider>
        */}
        <SmoothScrollProvider>
          <ClarityProvider />
          <Navbar />
          <CommandPalette />
          <PageTransition>
            {children}
          </PageTransition>
          <Footer />
        </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
