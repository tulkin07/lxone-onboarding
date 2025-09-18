// app/onboarding/layout.tsx  (SERVER component, "use client" YO'Q!)
import "../../app/globals.css"
import React from "react"
import OnboardingLayoutClient from "@/features/registration/components/OnboardingLayoutClient"

export const metadata = {
  title: "Lx1 - Onboarding",
  description: "Onboarding process for Lx1",
  openGraph: {
    title: "Lx1 - Onboarding",
    description: "Manage your onboarding steps with ease",
    url: "https://lxone-onboarding.vercel.app/onboarding/step-one",
    siteName: "Lx1",
    images: [
      {
        url: "https://lxone.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Lx1 Dashboard Preview",
      },
    ],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <OnboardingLayoutClient>
    {children}
    </OnboardingLayoutClient>
}
