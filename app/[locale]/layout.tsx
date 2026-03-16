import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { notFound } from "next/navigation"
import { routing } from "@/i18n/routing"
import "../globals.css"
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
  alternates: {
    canonical: "https://dev-luisneves.me",
  },
  icons: {
    icon: "/favicon.ico",
  },
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params

  if (!routing.locales.includes(locale as "pt" | "en")) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
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
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
