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
      router.push("/registration/step-three")
    }, 400)
  }

  return (
    <main className="mx-auto p-3 pt-0">
      <form onSubmit={handleSubmit} className="mt-4">
      <div>
        <h2 className="mb-4 text-lg font-semibold dark:text-gray-400">
         Vehicle info
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Company Name */}
          <div>
            <Label
              required
              // className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Make and Model
            </Label>
            <Input
              required
              type="text"
              placeholder="Make"
              // className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Phone Number */}
          <div>
            <Label className="mb-1 block text-sm font-medium text-gray-700">
              &nbsp;
            </Label>
            <Input
              required
              type="text"
              placeholder="Model"
              // className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Doing Business As */}
          <div>
            <Label
              required
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Door Dimensions
            </Label>
            <Input required type="number" placeholder="Width" />
          </div>

          {/* Employer ID */}
          <div>
            <Label className="mb-1 block text-sm font-medium text-gray-700">
              &nbsp;
            </Label>
            <Input required type="number" placeholder="Height" />
          </div>

          {/* Business Type */}
          <div className="relative">
            <Label
              required
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Equipment & Dock Height
            </Label>
            <Select
            required
              // value={
              //   formData.business_type
              //     ? formData.business_type.toString()
              //     : ""
              // }
              onValueChange={(value) => setBusinessType(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Equipment" />
              </SelectTrigger>
              <SelectContent>
                {businessTypes?.map((option: { id: number; label: string }) => (
                  <SelectItem key={option.id} value={option.id.toString()}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="relative">
            <Label className="mb-1 block text-sm font-medium text-gray-700">
              &nbsp;
            </Label>
            <Select
            required
              // value={
              //   formData.business_type
              //     ? formData.business_type.toString()
              //     : ""
              // }
              onValueChange={(value) => setBusinessType(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Dock Height " />
              </SelectTrigger>
              <SelectContent>
                {businessTypes?.map((option: { id: number; label: string }) => (
                  <SelectItem key={option.id} value={option.id.toString()}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-5">
          <div>
            <Label
              required
              className="mb-1 block text-sm font-medium text-gray-700"
            >
          Useful Cargo Dimensions (Inches)
            </Label>
            <Input required type="number" placeholder="Length" />
          </div>
          <div>
            <Label
              
              className="mb-1 block text-sm font-medium text-gray-700"
            >
               &nbsp;
            </Label>
            <Input required type="number" placeholder="Width " />
          </div>
          <div>
            <Label
              className="mb-1 block text-sm font-medium text-gray-700"
            >
                &nbsp;
            </Label>
            <Input required type="number" placeholder="Height" />
          </div>
        </div>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-5">
          <div>
            <Label
              required
              className="mb-1 block text-sm font-medium text-gray-700"
            >
        Payload and GVW 
            </Label>
            <Input required type="number" placeholder="Payload (lbs)" />
          </div>
          <div>
            <Label
              
              className="mb-1 block text-sm font-medium text-gray-700"
            >
               &nbsp;
            </Label>
            <Input required type="number" placeholder="GVW (lbs) " />
          </div>
        </div>
      </div>

      <div>
        <Button
                className="disabled:bg-gray-200 disabled:text-gray-500 w-full mt-4"
                type="submit"
                // disabled={!isAnyItemChecked || loading}
                aria-disabled={!isAnyItemChecked || loading}
                isLoading={loading}
              >
                {loading ? "Submitting..." : "Continue"}
              </Button>
      </div>
      </form>
    </main>
  )
}
