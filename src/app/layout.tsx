import { GeistSans } from "geist/font/sans"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import React from "react"
import "@mantine/core/styles.css"
import "@mantine/dates/styles.css"
import "./globals.css"
import { Toaster } from "@/components/Toaster"
import { MantineProviders } from "@/providers/MantineProviders"

export const metadata = {
  title: "Lx1",
  description: "Lx1 - Transporation Management System",
  authors: [{ name: "Lx1 - Manage Logistics With Ease" }],
  openGraph: {
    title: "Lx1",
    description: "Lx1 - Transporation Management System",
    url: "https://lxone-onboarding.vercel.app",
    siteName: "lxone-onboarding",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "",
        width: 48,
        height: 48,
        alt: "Lx1 - Manage Logistics With Ease",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.className} overflow-x-hidden overflow-y-scroll scroll-auto bg-gray-50 antialiased selection:bg-blue-100 selection:text-blue-700`}
      >
        {/* <ThemeProvider
          defaultTheme="system"
          disableTransitionOnChange
          attribute="class"
        > */}
        <MantineProviders>
          <NuqsAdapter>
            <Toaster />
            {children}
          </NuqsAdapter>
        </MantineProviders>
        {/* </ThemeProvider> */}
      </body>
    </html>
  )
}
