import { CompanyInfoProvider } from "@/context/CompanyInfoContext"
import { RegistrationProvider } from "@/context/RegisterationContext"
import OnboardingLayoutClient from "@/features/registration/components/OnboardingLayoutClient"
import QueryProvider from "@/providers/ReactQuery"
import React, { ReactNode, Suspense } from "react"

function OnboardingLoading() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-3">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      <p className="text-md text-gray-700">Loading ...</p>
    </div>
  )
}

export default function Onboarding({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <Suspense fallback={<OnboardingLoading />}>
        <CompanyInfoProvider>
          <OnboardingLayoutClient>
            <RegistrationProvider>{children}</RegistrationProvider>
          </OnboardingLayoutClient>
        </CompanyInfoProvider>
      </Suspense>
    </QueryProvider>
  )
}
