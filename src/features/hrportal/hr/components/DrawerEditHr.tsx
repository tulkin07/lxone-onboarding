"use client"

import { Button } from "@/components/Button"
import { Checkbox } from "@/components/Checkbox"
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerTitle,
} from "@/components/Drawer"
import ImageUploader from "@/components/FilePondComponent"
import { Input } from "@/components/Input"
import { Label } from "@/components/Label"
import MaskedInput from "@/components/MaskedInput"
import { useEffect, useState } from "react"
import { getSuccessMessage } from "@/lib/getSuccessMessage"
import { HrFormData } from "../types"
import { useStates } from "../hooks/useState"
import { useBusinessType } from "../hooks/useBusinessType"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Select"
import { X } from "lucide-react"
import { useUpdateHr } from "../hooks/useUpdateHr"
import DatePicker from "react-datepicker"
import dayjs from "dayjs"
import { LIMITED_LIABILITY } from "@/constants/constants"
import HrDocuments, { DocumentFile } from "./HrDocuments"
import { useToastMessage } from "@/hooks/useToastMessage"

export function DrawerEditHr({
  open,
  closeDrawer,
  data,
}: {
  open: boolean
  closeDrawer: () => void
  data: any
}) {
    const {getErrorMessage,getSuccessMessage} = useToastMessage()
  const { states, isLoadingState } = useStates()
  const { businessTypes } = useBusinessType()
  const { update, isPending } = useUpdateHr()
  const [exempt, setExempt] = useState(false)
  const [formData, setFormData] = useState({
    company_name: "",
    owner_first_name: "",
    owner_second_name: "",
    email: "",
    company_phone: "",
    owner_phone: "",
    zip_code: "",
    state: "",
    city: "",
    employee_id: "",
    address: "",
    company_birth_date: "",
    business_type: "",
    emergency_phone_number: "",
    title: "",
    mc_number: "",
    usdot_number: "",
    w9: "",
    void_check: "",
    ms_dot: "",
    additional_doc3: "",
    is_taxt_exempt: false,
    exemot_payee_code: "",
    fatca_reporting_code: "",
    deposit_company_name: "",
    city_state_zip: "",
    street_address: "",
    bank_name: "",
    accounting_number: "",
    routing_number: "",
    terms_accepted: false,
    company_id: "",
    owner_uuid: "",
    limited_liability: "",
    other_business_type: "",
    documents: [] as DocumentFile[],
  })
  useEffect(() => {
    if (data && open) {
      setFormData({ ...formData, ...data })
      setExempt(data?.is_taxt_exempt)
    }
  }, [data, open])
  useEffect(() => {
    if (!exempt) {
      setFormData((prev) => ({
        ...prev,
        fatca_reporting_code: "",
        exemot_payee_code: "",
      }))
    }
  }, [exempt])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    formData.limited_liability =
      formData.limited_liability || (null as unknown as string)
    formData.other_business_type =
      formData.business_type == "7" ? formData.other_business_type : ""
    update(formData as unknown as HrFormData, {
      onSuccess: () => {
        getSuccessMessage("Updated!")
        closeDrawer()
      },
    })
  }

  useEffect(() => {
    if (!open) {
      setFormData({
        company_name: "",
        owner_first_name: "",
        owner_second_name: "",
        email: "",
        company_phone: "",
        owner_phone: "",
        zip_code: "",
        state: "",
        city: "",
        employee_id: "",
        address: "",
        company_birth_date: "",
        business_type: "",
        emergency_phone_number: "",
        title: "",
        mc_number: "",
        usdot_number: "",
        w9: "",
        void_check: "",
        ms_dot: "",
        additional_doc3: "",
        is_taxt_exempt: false,
        exemot_payee_code: "",
        fatca_reporting_code: "",
        deposit_company_name: "",
        city_state_zip: "",
        street_address: "",
        bank_name: "",
        accounting_number: "",
        routing_number: "",
        terms_accepted: false,
        company_id: "",
        owner_uuid: "",
        limited_liability: "",
        other_business_type: "",
        documents: [],
      })
    }
  }, [open])

  const onChangeDocuments = (doc: DocumentFile[]) => {
    setFormData({ ...formData, documents: doc })
  }

  return (
    <Drawer open={open} onOpenChange={(state) => !state && closeDrawer()}>
      <DrawerOverlay className="data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out fixed inset-0 bg-black/40" />

      {/* Drawer Content */}
      <DrawerContent className="data-[state=open]:animate-drawer-slide-left-and-fade data-[state=closed]:animate-drawer-slide-right-and-fade fixed right-0 top-0 z-50 h-screen w-full max-w-[95%] overflow-y-auto bg-gray-100 p-4 shadow-lg">
        <DrawerHeader className="w-full">
          <DrawerTitle className="pb-1 text-xl font-semibold">
            <div className="flex items-center justify-between">
              <div>Update owner company</div>
              <div className="flex items-center gap-2">
                <DrawerClose asChild>
                  <Button variant="secondary" className="px-1 py-1">
                    <X />
                  </Button>
                </DrawerClose>
              </div>
            </div>
          </DrawerTitle>
        </DrawerHeader>

        <DrawerBody className="py-3">
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="flex items-start gap-2">
              {/* Left Side: Documents */}
              <div
                className="rounded-lg border border-gray-200 bg-gray-50 p-6 px-4 dark:border-gray-800 dark:bg-gray-900"
                style={{
                  width: "25%",
                  height: `calc(100vh - 130px)`,
                  overflowY: "auto",
                }}
              >
                <h3 className="mb-1 text-lg font-bold">Documents</h3>
                <HrDocuments
                  update={true}
                  data={formData?.documents}
                  onChangeDocuments={onChangeDocuments}
                />
              </div>

              {/* Right Side: Owner Info */}
              <div
                className="rounded-md px-3"
                style={{
                  width: "75%",
                  height: `calc(100vh - 130px)`,
                  overflowY: "auto",
                  paddingTop: "29px",
                }}
              >
                <h3 className="mb-1 text-lg font-bold">Owner Info</h3>

                <div className="grid grid-cols-3 gap-3">
                  {/* Row 1 */}
                  <div>
                    <Label className="text-xs" required>
                      Full Company Name
                    </Label>
                    <Input
                      name="company_name"
                      placeholder="Enter full company name"
                      value={formData.company_name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label className="text-xs" required>
                      Applicant First Name
                    </Label>
                    <Input
                      name="owner_first_name"
                      placeholder="Enter first name"
                      value={formData.owner_first_name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label className="text-xs" required>
                      Applicant Last Name
                    </Label>
                    <Input
                      name="owner_second_name"
                      placeholder="Enter last name"
                      value={formData.owner_second_name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* Row 2 */}
                  <div>
                    <Label className="text-xs" required>
                      Email
                    </Label>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label className="text-xs" required>
                      Company Phone
                    </Label>
                    <MaskedInput
                      mask="+1 (000) 000-0000"
                      placeholder="+1 (123) 456-7890"
                      value={formData.company_phone}
                      onChange={(value: string) =>
                        setFormData((prev) => ({
                          ...prev,
                          company_phone: value,
                        }))
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label className="text-xs" required>
                      Applicant Phone*
                    </Label>
                    <MaskedInput
                      mask="+1 (000) 000-0000"
                      placeholder="+1 (123) 456-7890"
                      value={formData.owner_phone}
                      onChange={(value: string) =>
                        setFormData((prev) => ({
                          ...prev,
                          owner_phone: value,
                        }))
                      }
                      required
                    />
                  </div>

                  {/* Row 3 */}
                  <div>
                    <Label className="text-xs" required>
                      ZIP Code
                    </Label>
                    <Input
                      name="zip_code"
                      placeholder="ZIP Code"
                      value={formData.zip_code}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label className="text-xs" required>
                      State
                    </Label>
                    <Select
                      value={
                        formData.state
                          ? formData.state
                          : data
                            ? data?.state
                            : []
                      }
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          state: value,
                        }))
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select State" />
                      </SelectTrigger>
                      <SelectContent>
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
                  <div>
                    <Label className="text-xs" required>
                      City
                    </Label>
                    <Input
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* Row 4 */}
                  <div>
                    <Label className="text-xs" required>
                      Employer ID
                    </Label>
                    <MaskedInput
                      mask="00-0000000"
                      placeholder="xx-xxxxxxx"
                      value={formData.employee_id}
                      onChange={(value: string) =>
                        setFormData((prev) => ({
                          ...prev,
                          employee_id: value,
                        }))
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label className="text-xs" required>
                      Address Line
                    </Label>
                    <Input
                      name="address"
                      placeholder="Address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label className="text-xs" required>
                      Company Birth
                    </Label>
                    <DatePicker
                      locale="en-GB"
                      wrapperClassName="w-full"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm outline-none focus:border-blue-500 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-100 dark:focus:border-blue-400 dark:focus:ring-blue-500/40"
                      calendarClassName="rounded-xl shadow-lg text-sm bg-white dark:bg-gray-900 dark:text-gray-100"
                      selected={
                        formData.company_birth_date
                          ? dayjs(formData.company_birth_date).toDate()
                          : null
                      }
                      onChange={(date) => {
                        if (date) {
                          setFormData((prev) => ({
                            ...prev,
                            company_birth_date:
                              dayjs(date).format("YYYY-MM-DD"),
                          }))
                        }
                      }}
                      dateFormat="MMMM d, yyyy"
                      placeholderText="Select date"
                      required
                    />
                  </div>

                  {/* Row 5 */}
                  <div>
                    <Label className="text-xs">Emergency Phone</Label>
                    <MaskedInput
                      mask="+1 (000) 000-0000"
                      placeholder="+1 (123) 456-7890"
                      value={formData.emergency_phone_number}
                      onChange={(value: string) =>
                        setFormData((prev) => ({
                          ...prev,
                          emergency_phone_number: value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Title</Label>
                    <Input
                      name="title"
                      placeholder="Title"
                      value={formData.title}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label className="text-xs" required>
                      Business Type
                    </Label>

                    <Select
                      value={
                        formData.business_type.toString() || data?.business_type
                      }
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          business_type: value, // id as string
                        }))
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Business Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {businessTypes?.map(
                          (option: { id: number; label: string }) => (
                            <SelectItem
                              key={option.id}
                              value={option.id.toString()}
                            >
                              {option.label}
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Row 6 */}
                  <div>
                    <Label className="text-xs">MC</Label>
                    <Input
                      name="mc_number"
                      placeholder="MC"
                      value={formData.mc_number}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label className="text-xs">USDOT</Label>
                    <Input
                      name="usdot_number"
                      placeholder="USDOT"
                      value={formData.usdot_number}
                      onChange={handleInputChange}
                    />
                  </div>
                  {formData.business_type == "6" && (
                    <div>
                      <Label className="text-xs" required>
                        Limited Liability Company
                      </Label>

                      <Select
                        value={
                          formData.limited_liability
                            ? formData.limited_liability
                            : ""
                        }
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            limited_liability: value, // id as string
                          }))
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Liability Type" />
                        </SelectTrigger>
                        <SelectContent>
                          {LIMITED_LIABILITY?.map(
                            (option: { value: string; label: string }) => (
                              <SelectItem
                                key={option.label}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  {formData.business_type == "7" && (
                    <div>
                      <Label className="text-xs" required>
                        Other
                      </Label>
                      <Input
                        name="other_business_type"
                        placeholder="Other"
                        value={formData.other_business_type}
                        onChange={handleInputChange}
                      />
                    </div>
                  )}
                </div>

                {/* Tax Exempt Section */}
                <div className="py-4">
                  <div className="text-md mb-1 flex items-center gap-2 font-light text-slate-700">
                    <span> Tax exempt?</span>
                    <Checkbox
                      checked={formData.is_taxt_exempt}
                      onCheckedChange={(e) => {
                        const isChecked = Boolean(e)
                        setExempt(isChecked)
                        setFormData((prev) => ({
                          ...prev,
                          is_taxt_exempt: isChecked,
                        }))
                      }}
                    />
                  </div>
                  {exempt && (
                    <div>
                      <h4 className="text-md mb-1 py-2 font-semibold">
                        Exemptions
                      </h4>
                      <p className="text-md mb-1 font-light text-slate-700">
                        (codes apply only to certain entities, not individuals;
                        see instructions on page 3)
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-xs">
                            Exempt Payee Code (If Any)
                          </Label>
                          <Input
                            name="exemot_payee_code"
                            placeholder="Exempt Payee Code"
                            value={
                              formData.exemot_payee_code ||
                              data?.exemot_payee_code
                            }
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <Label className="text-xs">
                            Exemption From FATCA Reporting Code (If Any)
                          </Label>
                          <Input
                            name="fatca_reporting_code"
                            placeholder="Exemption From FATCA Reporting Code"
                            value={
                              formData.fatca_reporting_code ||
                              data?.fatca_reporting_code
                            }
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Direct Deposit Form */}
                <div className="mt-4">
                  <h4 className="text-md mb-1 font-semibold">
                    Direct Deposit Form
                  </h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label className="text-xs">Company Name</Label>
                      <Input
                        name="deposit_company_name"
                        placeholder="Company Name"
                        value={formData.deposit_company_name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label className="text-xs">
                        City, State And Zip Code
                      </Label>
                      <Input
                        name="city_state_zip"
                        placeholder="City, State, Zip"
                        value={formData.city_state_zip}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Street Address</Label>
                      <Input
                        name="street_address"
                        placeholder="Street Address"
                        value={formData.street_address}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Bank Name</Label>
                      <Input
                        name="bank_name"
                        placeholder="Bank Name"
                        value={formData.bank_name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label className="text-xs" required>
                        Accounting Number
                      </Label>
                      <Input
                        name="accounting_number"
                        placeholder="Accounting Number"
                        value={formData.accounting_number}
                        onChange={handleInputChange}
                        type="text"
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-xs" required>
                        Routing Number
                      </Label>
                      <Input
                        name="routing_number"
                        placeholder="Routing Number"
                        value={formData.routing_number}
                        onChange={handleInputChange}
                        type="text"
                        required
                      />
                    </div>
                  </div>
                  <div className="my-4 flex justify-end">
                    <Button
                      type="submit"
                      className="px-4 py-1"
                      disabled={isPending}
                    >
                      {isPending ? "Panding..." : "Update"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
