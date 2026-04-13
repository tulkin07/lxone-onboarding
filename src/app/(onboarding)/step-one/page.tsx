import { CompanyInfoProvider } from '@/context/CompanyInfoContext'
import StepOnePage from '@/features/registration/components/StepOnePage'
import React from 'react'

export default function StepOne({ searchParams }: { searchParams: { token?: string } }) {
  const token = searchParams.token || ""
  return (
    // <CompanyInfoProvider>
      <StepOnePage token={token} />
    // </CompanyInfoProvider>
   
  
  )
}
