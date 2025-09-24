import StepTwoPage from "@/features/registration/components/StepTwoPage"
import React from "react"

export default function StepTwo({ searchParams }: { searchParams: { token?: string } }) {
  const token = searchParams.token||""
  
  return <StepTwoPage token={token} />
}
