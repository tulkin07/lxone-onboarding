"use client"
import { Button } from "@/components/Button"
import { Checkbox } from "@/components/Checkbox"
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
import { useRegistration } from "@/context/RegisterationContext"
import { useBusinessType } from "@/features/hrportal/hr/hooks/useBusinessType"
import { useStates } from "@/features/hrportal/hr/hooks/useState"
import { ModalRegistration } from "@/features/registration/components/ModalRegistration"
import ZipCodeSelect from "@/features/registration/components/ZipCodeSelect"
import { Select } from "@radix-ui/react-select"
import { InfoIcon } from "lucide-react"
import Link from "next/link"
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
  const [taxExempt, setTaxExempt] = useState(false)
  const { businessTypes } = useBusinessType()
  const isAnyItemChecked = Object.values(checkedItems).some(Boolean)
  const { data, updateData } = useRegistration()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      console.log("Form submitted:", checkedItems)
      router.push("/registration/step-two")
    }, 400)
  }

  return (
    <main className="mx-auto p-3 pt-0">
      <form onSubmit={handleSubmit}>
        <div>
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold dark:text-gray-400">
            <InfoIcon className="text-blue-500" />{" "}
            <span className="flex">
              <span>Registration conditions, </span>
              <ModalRegistration>
                <span className="mt-4 w-full cursor-pointer gap-2 text-blue-500 sm:mt-0 sm:w-fit">
                  click here!
                </span>
              </ModalRegistration>
            </span>
          </h2>
          <h2 className="mb-4 text-lg font-semibold dark:text-gray-400">
            Company info
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Company Name */}
            <div>
              <Label
                className="mb-1 block text-sm font-medium text-gray-700"
                required
                // className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Company name
              </Label>
              <Input
                value={data.company_name}
                required
                type="text"
                placeholder="Company name"
                onChange={(e) => {
                  updateData({ ...data, company_name: e.target.value })
                }}
                // className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Phone Number */}
            <div>
              <Label
                required
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Phone number
              </Label>
              <MaskedInput
                value={data.company_phone}
                mask="+1 (000) 000-0000"
                placeholder="+1 (123) 456-7890"
                required
                onChange={(value) =>
                  updateData({ ...data, company_phone: value })
                }
              />
            </div>

            {/* Doing Business As */}
            <div>
              <Label
                required
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Doing business as:
              </Label>
              <Input
                // value={data.other_business_type}
                // onChange={(e) =>
                //   updateData({ other_business_type: e.target.value })
                // }
                required
                type="text"
                placeholder="4564"
              />
            </div>

            {/* Employer ID */}
            <div>
              <Label className="mb-1 block text-sm font-medium text-gray-700">
                Employer ID number
              </Label>
              <MaskedInput
                value={data.employee_id}
                onChange={(e) => updateData({ ...data, employee_id: e })}
                mask="00-0000000"
                placeholder="xx-xxxxxxx"
                required
              />
            </div>

            {/* Business Type */}
            <div className="relative">
              <Label
                required
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Business type
              </Label>
              <Select
                required
                value={data.business_type.toString()}
                onValueChange={(e: string) =>
                  updateData({ ...data, business_type: e as unknown as number })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Business Type" />
                </SelectTrigger>
                <SelectContent>
                  {businessTypes?.map(
                    (option: { id: number; label: string }) => (
                      <SelectItem key={option.id} value={option.id.toString()}>
                        {option.label}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* ZIP Code */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <Label
                  required
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  ZIP code
                </Label>
                <ZipCodeSelect/>
                {/* <Select required value={""}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select ZIP code " />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 overflow-y-auto">
                    {isPending ? (
                      <div className="p-2 text-center text-gray-500">
                        Loading...
                      </div>
                    ) : zipCodeList?.detail?.length === 0 ? (
                      <SelectItem value="no-data" disabled>
                        No data
                      </SelectItem>
                    ) : (
                      zipCodeList?.detail?.map(
                        (option: {
                          zip: string
                          city: string
                          state: string | null
                        }) => (
                          <SelectItem key={option.zip} value={option.zip}>
                            {option.zip} – {option.city}{" "}
                            {option.state ? `(${option.state})` : ""}
                          </SelectItem>
                        ),
                      )
                    )}
                  </SelectContent>
                </Select> */}

                {/* <Input type="number" placeholder="ZIP code" required /> */}
              </div>

              {/* State */}
              <div className="relative">
                <Label
                  required
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  State
                </Label>
                <Select required>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 overflow-y-auto">
                    {isLoadingState ? (
                      <div className="p-2 text-center text-gray-500">
                        Loading...
                      </div>
                    ) : (
                      states?.results?.map(
                        (option: {
                          id: number
                          short_name: string
                          name: string
                        }) => (
                          <SelectItem key={option.id} value={option.name}>
                            {option.short_name}
                          </SelectItem>
                        ),
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-1">
            {data.business_type == 6 && (
              <div className="mb-4">
                <Label
                  className="mb-1 block text-sm font-medium text-gray-700"
                  required
                >
                  Limited Liability Company
                </Label>

                <Select
                // value={
                //   formData.limited_liability
                //     ? formData.limited_liability
                //     : ""
                // }
                // onValueChange={(value) =>
                //   setFormData((prev) => ({
                //     ...prev,
                //     limited_liability: value, // id as string
                //   }))
                // }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Liability Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {LIMITED_LIABILITY?.map(
                      (option: { value: string; label: string }) => (
                        <SelectItem key={option.label} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>
              </div>
            )}
            {data.business_type == 7 && (
              <div className="mb-4">
                <Label
                  className="mb-1 block text-sm font-medium text-gray-700"
                  required
                >
                  Other
                </Label>
                <Input name="other_business_type" placeholder="Other" />
              </div>
            )}
          </div>
          <div className="mt-0 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* City */}
            <div>
              <Label
                required
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                City
              </Label>
              <Input required type="text" placeholder="City" />
            </div>

            {/* Address */}
            <div>
              <Label
                required
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Address
              </Label>
              <Input required type="text" placeholder="Address" />
            </div>

            {/* First Name */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <Label
                  required
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  First name
                </Label>
                <Input type="text" placeholder="First name" required />
              </div>

              {/* Last Name */}
              <div>
                <Label
                  required
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Last name
                </Label>
                <Input type="text" placeholder="Last name" required />
              </div>
            </div>

            {/* Email */}
            <div>
              <Label
                required
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Email
              </Label>
              <Input
                type="email"
                required
                placeholder="youremail@service.com"
              />
            </div>
          </div>
        </div>
        <div className="space-y-2 pt-5">
          <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-400">
            <Checkbox
              className="h-4 w-4 cursor-pointer"
              checked={taxExempt}
              onCheckedChange={(checked: boolean) => {
                setTaxExempt(checked)
              }}
            />
            Tax exempt?
          </label>
          {taxExempt && (
            <div className="mt-4">
              <h2 className="font-semibold dark:text-gray-400">Exemptions</h2>
              <p className="text-sm text-gray-500">
                (codes apply only to certain entities, not individuals;{" "}
                <a
                  href="#"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  {" "}
                  <br />
                  see instructions on page 3
                </a>
                )
              </p>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div>
                  <Label className="mb-1 block text-sm font-medium">
                    Exempt payee code (if any)
                  </Label>
                  <Input type="text" placeholder="Code" />
                </div>

                <div>
                  <Label className="mb-1 block text-sm font-medium">
                    Exemption from FATCA reporting code (if any)
                  </Label>
                  <Input type="text" placeholder="Code" />
                </div>
              </div>
            </div>
          )}

          <label className="flex items-center gap-2 pt-3 text-sm text-gray-700">
            <Checkbox className="h-4 w-4" />
            <span className="text-sm dark:text-gray-400">
              I agree to messaging from for customer care at the phone number
              provided above. I understand I will receive messages, data rates
              may apply, reply stop to opt-out, reply yes to opt-in
            </span>
          </label>

          <Label
            required
            className="flex items-center gap-2 pt-3 text-sm text-gray-700"
          >
            <Checkbox className="h-4 w-4 rounded border-gray-300" required />
            <span className="text-sm dark:text-gray-400">
              I have read and agree to the{" "}
              <Link href={""} className="text-blue-500">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link href={""} className="text-blue-500">
                Terms & Conditions.
              </Link>{" "}
              Also consent to the collection, use, and processing of my personal
              data as described therein
            </span>
          </Label>
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
