import { CompanyInfoProvider } from "@/context/CompanyInfoContext"
import { RegistrationProvider } from "@/context/RegisterationContext"
import OnboardingLayoutClient from "@/features/registration/components/OnboardingLayoutClient"
import QueryProvider from "@/providers/ReactQuery"
import React, { ReactNode } from "react"

export default function Onboarding({ children }: { children: ReactNode }) {

  return (
    <QueryProvider>
      <CompanyInfoProvider>
        <OnboardingLayoutClient>
          <RegistrationProvider>{children}</RegistrationProvider>
        </OnboardingLayoutClient>
      </CompanyInfoProvider>
    </QueryProvider>


  )
}
