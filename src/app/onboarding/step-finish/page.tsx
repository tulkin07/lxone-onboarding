"use client"
import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { Label } from "@/components/Label"
import MaskedInput from "@/components/MaskedInput"
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Select"
import SignaturePad from "@/components/SignaturePad"
import { LIMITED_LIABILITY } from "@/constants/constants"
import { useBusinessType } from "@/features/hrportal/hr/hooks/useBusinessType"
import { useStates } from "@/features/hrportal/hr/hooks/useState"
import { Select } from "@radix-ui/react-select"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

interface Category {
  id: string
  title: string
  subcategories: string[]
}

interface CheckedItems {
  [categoryId: string]: boolean
}

export default function Products() {
  const [checkedItems, setCheckedItems] = React.useState<CheckedItems>({})
  const [loading, setLoading] = React.useState(false)
  const router = useRouter()
  const { states, isLoadingState } = useStates()
  const [step, setStep] = useState(1)
  const [taxExempt, setTaxExempt] = useState(false)
  const { businessTypes } = useBusinessType()
  const [businessType, setBusinessType] = useState("")

  const isAnyItemChecked = Object.values(checkedItems).some(Boolean)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      console.log("Form submitted:", checkedItems)
      // router.push("/registration/employees")
    }, 400)
  }

  return (
    <main className="mx-auto p-3 pt-0">
      <form onSubmit={handleSubmit} className="mt-4">
        <div>
          <Label
            required
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Read the documents and sign
          </Label>
          <SignaturePad />
        </div>
        <Button
          className="mt-4 w-full disabled:bg-gray-200 disabled:text-gray-500"
          type="submit"
          // disabled={!isAnyItemChecked || loading}
          aria-disabled={!isAnyItemChecked || loading}
          isLoading={loading}
        >
          {loading ? "Submitting..." : "Continue"}
        </Button>
      </form>
    </main>
  )
}
