import { RegistrationProvider } from "@/context/RegisterationContext"
import OnboardingLayoutClient from "@/features/registration/components/OnboardingLayoutClient"
import React, { ReactNode } from "react"

export default function Onboarding({ children }: { children: ReactNode }) {
    console.log("test" )
  return (
    <OnboardingLayoutClient>
      <RegistrationProvider>{children}</RegistrationProvider>
    </OnboardingLayoutClient>
  )
}
