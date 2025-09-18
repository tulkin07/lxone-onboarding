import { GeistSans } from "geist/font/sans"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import React from "react"
import "./globals.css"

export const metadata = {
  title: "Lx1",
  description: "Lx1 - Transporation Management System",
  authors: [{ name: "Lx1 - Manage Logistics With Ease" }],
  openGraph: {
    title: "Lx1",
    description: "Lx1 - Transporation Management System",
    url: "https://lxone-onboarding.vercel.app/onboarding/step-one",
    siteName: "lxone-onboarding",
    // images: [
    //   {
    //     url: "https://lxone.vercel.app/og-image.png",
    //     width: 1200,
    //     height: 630,
    //     alt: "Lx1 Dashboard Preview",
    //   },
    // ],
    locale: "en_US",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" >
      <body
        className={`${GeistSans.className} overflow-x-hidden overflow-y-scroll scroll-auto bg-gray-50 antialiased selection:bg-blue-100 selection:text-blue-700 `}
      >
        {/* <ThemeProvider
          defaultTheme="system"
          disableTransitionOnChange
          attribute="class"
        > */}
          <NuqsAdapter>
            <div>{children}</div>
          </NuqsAdapter>
        {/* </ThemeProvider> */}
      </body>
    </html>
  )
}
