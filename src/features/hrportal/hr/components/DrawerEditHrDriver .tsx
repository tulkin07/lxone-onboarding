"use client"

import { Button } from "@/components/Button"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Select"
import { X } from "lucide-react"
import { useEffect, useState } from "react"
import { useStates } from "../hooks/useState"
import { useHrDriverDetails } from "../hooks/useHrDriverDetails"
import { useUpdateHrDriver } from "../hooks/useUpdateHrDriver"
// import { getSuccessMessage } from "@/lib/getSuccessMessage"
import AnimatePulse from "@/components/AnimatePulse"
import DatePicker from "react-datepicker"
import { formatDate } from "date-fns"
import dayjs from "dayjs"
import HrDriverDocuments, { DocumentFile } from "./HrDriverDocuments"
import { useToastMessage } from "@/hooks/useToastMessage"

export interface HrDriverFormData {
  first_name: string
  last_name: string
  birth_date: string
  address: string
  city: string
  state: string
  zip_code: string
  ssn: string
  gmail: string
  phone_number: string
  emergency_phone_number: string
  license_number: string
  license_state: string
  license_type: string
  license_expiration_date: string
  driver_license: string
  driving_record: string
  passport: string
  id: string
  owner_company_id: string
   documents: DocumentFile[]
}

export function DrawerEditHrDriver({
  open,
  closeDrawer,
  id,
}: {
  open: boolean
  id: string | null
  closeDrawer: () => void
}) {
    const {getErrorMessage,getSuccessMessage} = useToastMessage()
  const { hr, isLoading, refetch } = useHrDriverDetails(id)
  const { states, isLoadingState } = useStates()
  const { update, isPending } = useUpdateHrDriver()
  const [formData, setFormData] = useState<HrDriverFormData>({
    first_name: "",
    last_name: "",
    birth_date: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
    ssn: "",
    gmail: "",
    phone_number: "",
    emergency_phone_number: "",
    license_number: "",
    license_state: "",
    license_type: "",
    license_expiration_date: "",
    driver_license: "",
    driving_record: "",
    passport: "",
    id: "",
    owner_company_id: "",
     documents: [],
  })

  useEffect(() => {
    if (hr && open) {
      const [firstName, ...lastNameParts] = hr.full_name.split(" ")
      const lastName = lastNameParts.join(" ")
      setFormData({
        first_name: firstName || "",
        last_name: lastName || "",
        birth_date: hr.birth_date || "",
        address: hr.address || "",
        city: hr.city || "",
        state: hr.state || "",
        zip_code: hr.zip_code || "",
        ssn: hr.ssn || "",
        gmail: hr.gmail || "",
        phone_number: hr.phone_number || "",
        emergency_phone_number: hr.emergency_phone_number || "",
        license_number: hr.license_number || "",
        license_state: hr.license_state || "",
        license_type: hr.license_type || "",
        license_expiration_date: hr.license_expiration_date || "",
        driver_license: hr.driver_license || "",
        driving_record: hr.driving_record || "",
        passport: hr.passport || "",
        id: hr.id || "",
        owner_company_id: hr?.owner_company_id || "",
        documents:hr?.documents
      })
    }
  }, [hr, id, open])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const submissionData = {
      full_name: `${formData.first_name} ${formData.last_name}`.trim(),
      birth_date: formData.birth_date,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zip_code: formData.zip_code,
      ssn: formData.ssn,
      gmail: formData.gmail,
      phone_number: formData.phone_number,
      emergency_phone_number: formData.emergency_phone_number,
      license_number: formData.license_number,
      license_state: formData.license_state,
      license_type: formData.license_type,
      license_expiration_date: formData.license_expiration_date,
      driver_license: formData.driver_license,
      driving_record: formData.driving_record,
      passport: formData.passport,
      owner_company_id: formData.owner_company_id,
      id: hr?.id,
      documents: formData.documents,
    }
    update(submissionData as unknown as HrDriverFormData, {
      onSuccess: () => {
        getSuccessMessage("Updated!")
        closeDrawer()
      },
    })
  }

  useEffect(() => {
    if (open && id) {
      console.log("Triggering refetch for driver ID:", id)
      refetch()
    }
  }, [open, id, refetch])

   const onChangeDocuments = (doc: DocumentFile[]) => {
      setFormData({ ...formData, documents: doc })
    }

  return (
    <Drawer open={open} onOpenChange={(state) => !state && closeDrawer()}>
      <DrawerOverlay className="data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out fixed inset-0 bg-black/40" />
      <DrawerContent className="data-[state=open]:animate-drawer-slide-left-and-fade data-[state=closed]:animate-drawer-slide-right-and-fade fixed right-0 top-0 z-50 h-screen w-full max-w-[95%] overflow-y-auto bg-gray-100 p-4 shadow-lg">
        <DrawerHeader className="w-full">
          <DrawerTitle className="pb-1 text-xl font-semibold">
            <div className="flex items-center justify-between">
              <div>Edit Driver </div>
              <DrawerClose asChild>
                <Button variant="secondary" className="px-1 py-1">
                  <X />
                </Button>
              </DrawerClose>
            </div>
          </DrawerTitle>
        </DrawerHeader>

        <DrawerBody className="py-3">
          {isLoading ? (
            <AnimatePulse row={8} col={4} />
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="flex items-start gap-2">
                <div
                  className="rounded-lg border border-gray-200 bg-gray-50 p-6 px-4 dark:border-gray-800 dark:bg-gray-900"
                  style={{
                    width: "25%",
                    height: `calc(100vh - 130px)`,
                    overflowY: "auto",
                  }}
                >
                  <h3 className="mb-1 text-lg font-bold">Documents</h3>
                  <HrDriverDocuments
                    data={formData?.documents}
                    onChangeDocuments={onChangeDocuments}
                  />
                </div>
                <div
                  className="rounded-md px-3"
                  style={{
                    width: "75%",
                    height: `calc(100vh - 130px)`,
                    overflowY: "auto",
                    paddingTop: "29px",
                  }}
                >
                  <h3 className="mb-1 text-lg font-bold">Driver Info</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {/* Row 1 */}
                    <div>
                      <Label className="text-xs" required>
                        First Name
                      </Label>
                      <Input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleInputChange}
                        placeholder="Enter first name"
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-xs" required>
                        Last Name
                      </Label>
                      <Input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleInputChange}
                        placeholder="Enter last name"
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-xs" required>
                        Birth Date
                      </Label>
                      <DatePicker
                        locale="en-GB"
                        wrapperClassName="w-full"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm outline-none focus:border-blue-500 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-100 dark:focus:border-blue-400 dark:focus:ring-blue-500/40"
                        calendarClassName="rounded-xl shadow-lg text-sm bg-white dark:bg-gray-900 dark:text-gray-100"
                        selected={
                          formData.birth_date
                            ? dayjs(formData.birth_date).toDate()
                            : null
                        }
                        onChange={(date) => {
                          if (date) {
                            setFormData((prev) => ({
                              ...prev,
                              birth_date: dayjs(date).format("YYYY-MM-DD"),
                            }))
                          }
                        }}
                        dateFormat="MMMM d, yyyy"
                        placeholderText="Select date"
                        required
                      />
                    </div>

                    {/* Row 2 */}
                    <div>
                      <Label className="text-xs" required>
                        Address
                      </Label>
                      <Input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Enter address"
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-xs" required>
                        City
                      </Label>
                      <Input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Enter city"
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-xs" required>
                        State
                      </Label>
                      <Select
                        name="state"
                        value={formData.state || hr?.state}
                        onValueChange={(value) =>
                          setFormData((prev) => ({ ...prev, state: value }))
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

                    {/* Row 3 */}
                    <div>
                      <Label className="text-xs" required>
                        ZIP
                      </Label>
                      <Input
                        type="text"
                        name="zip_code"
                        value={formData.zip_code}
                        onChange={handleInputChange}
                        placeholder="ZIP Code"
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-xs">SSN</Label>
                      <Input
                        type="text"
                        name="ssn"
                        value={formData.ssn}
                        onChange={handleInputChange}
                        placeholder="Enter SSN"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="mb-1 text-lg font-bold">Contact Methods</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label className="text-xs" >
                          Email
                        </Label>
                        <Input
                          type="email"
                          name="gmail"
                          value={formData.gmail}
                          onChange={handleInputChange}
                          placeholder="Enter email"
                          // required
                        />
                      </div>
                      <div>
                        <Label className="text-xs" required>
                          Phone
                        </Label>
                        <MaskedInput
                          mask="+1 (000) 000-0000"
                          name="phone_number"
                          value={formData.phone_number}
                          onChange={(value: string) =>
                            setFormData((prev) => ({
                              ...prev,
                              phone_number: value,
                            }))
                          }
                          placeholder="+1 (123) 456-7890"
                          required
                        />
                      </div>
                      <div>
                        <Label className="text-xs" required>
                          Emergency Contact Phone
                        </Label>
                        <MaskedInput
                          mask="+1 (000) 000-0000"
                          name="emergency_phone_number"
                          value={formData.emergency_phone_number}
                          onChange={(value: string) =>
                            setFormData((prev) => ({
                              ...prev,
                              emergency_phone_number: value,
                            }))
                          }
                          required
                          placeholder="+1 (123) 456-7890"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="mb-1 text-lg font-bold">Driver License</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label className="text-xs">License Number</Label>
                        <Input
                          type="text"
                          name="license_number"
                          value={formData.license_number}
                          onChange={handleInputChange}
                          placeholder="Enter license number"
                        />
                      </div>
                      <div>
                        <Label className="text-xs" required>
                          License State
                        </Label>
                        <Select
                          name="license_state"
                          value={formData.license_state || hr?.license_state}
                          onValueChange={(value) =>
                            setFormData((prev) => ({
                              ...prev,
                              license_state: value,
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
                                  <SelectItem
                                    key={option.id}
                                    value={option.name}
                                  >
                                    {option.short_name}
                                  </SelectItem>
                                ),
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-xs">License Type</Label>
                        <Input
                          type="text"
                          name="license_type"
                          value={formData.license_type}
                          onChange={handleInputChange}
                          placeholder="Enter license type"
                        />
                      </div>
                      <div>
                        <Label className="text-xs" required>
                          License Expiration Date
                        </Label>
                        <DatePicker
                          locale="en-GB"
                          wrapperClassName="w-full"
                          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm outline-none focus:border-blue-500 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-100 dark:focus:border-blue-400 dark:focus:ring-blue-500/40"
                          calendarClassName="rounded-xl shadow-lg text-sm bg-white dark:bg-gray-900 dark:text-gray-100"
                          selected={
                            formData.license_expiration_date
                              ? dayjs(formData.license_expiration_date).toDate()
                              : null
                          }
                          onChange={(date) => {
                            if (date) {
                              setFormData((prev) => ({
                                ...prev,
                                license_expiration_date:
                                  dayjs(date).format("YYYY-MM-DD"),
                              }))
                            }
                          }}
                          dateFormat="MMMM d, yyyy"
                          placeholderText="Select date"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="my-4 flex justify-end">
                    <Button type="submit" className="px-5 py-1">
                      {isPending ? "Loading..." : "Save"}
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
