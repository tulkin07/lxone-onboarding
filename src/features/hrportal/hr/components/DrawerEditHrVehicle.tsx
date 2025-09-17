"use client"

import { Button } from "@/components/Button"
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerOverlay,
} from "@/components/Drawer"
import ImageUploader from "@/components/FilePondComponent"
import { Input } from "@/components/Input"
import { Label } from "@/components/Label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Select"
import { X } from "lucide-react"
import { useHrDriversList } from "../hooks/useHrDriversList"
import { HIGH_DOCK_OPTIONS, TRUCK_TYPES } from "@/constants/constants"
import { useStates } from "../hooks/useState"
import { useHrVehicleTools } from "../hooks/useHrVehicleTools"
import { MultiSelect } from "@/components/MultiSelect"
import { useEffect, useMemo, useState } from "react"
import { CreateVehicleSetupDto } from "../types"
import { useParams } from "next/navigation"
import { useHrVehicleDetails } from "../hooks/useHrVehicleDetails"
import AnimatePulse from "@/components/AnimatePulse"
import { useUpdateHrVehicle } from "../hooks/useUpdateHrVehicle"
import DatePicker from "react-datepicker"
import dayjs from "dayjs"
import HrVehicleDocuments, { DocumentFile } from "./HrVehicleDocuments"

export function DrawerEditHrVehicle({
  open,
  closeDrawer,
  id,
}: {
  open: boolean
  closeDrawer: () => void
  id: string | null
}) {
  const { hrDrivers, isLoadingDriversList } = useHrDriversList()
  const { states, isLoadingState } = useStates()
  const { vehicleTools, isLoadingVehicleTools } = useHrVehicleTools()
  const { hrVehicle, isLoading, refetch } = useHrVehicleDetails(id)
  const { update, isPending } = useUpdateHrVehicle()
  const params = useParams()

  const initialFormData: CreateVehicleSetupDto = {
    truck_type: "",
    make: "",
    model: "",
    payload: "",
    gvw: "",
    year: "",
    plate: "",
    license_expire_date: "",
    license_expire_state: "",
    insurance_company: "",
    insurance_expire_date: "",
    policy: "",
    vehicle_vin: "",
    length: "",
    width: "",
    height: "",
    door_width: "",
    door_height: "",
    high_dock: "no",
    vehicle_registration_document: "",
    insurance_certificate: "",
    photo_left_side: "",
    photo_right_side: "",
    cargo_space_photo: "",
    main_driver_id: "",
    secondary_driver_id: "",
    equipment_ids: [],
    id: "",
    documents: [],
  }

  const [formData, setFormData] =
    useState<CreateVehicleSetupDto>(initialFormData)

  // Handle initial load and refetch
  useEffect(() => {
    if (open && id) {
      refetch()
    }
  }, [open, id, refetch])
  useEffect(
    () => {
      console.log({
        isFormReady,
      })
    },
    [
      // isLoading,
      // isLoadingState,
      // isLoadingVehicleTools,
      // hrVehicle,
      // isValidLicenseState,
      // isValidHighDock,
    ],
  )
  // Update form data when hrVehicle changes
  useEffect(() => {
    if (hrVehicle && open && id) {
      const newFormData = {
        ...initialFormData,
        ...hrVehicle,
        payload: hrVehicle.payload?.toString() || "",
        gvw: hrVehicle.gvw?.toString() || "",
        year: hrVehicle.year?.toString() || "",
        length: hrVehicle.length?.toString() || "",
        width: hrVehicle.width?.toString() || "",
        height: hrVehicle.height?.toString() || "",
        door_width: hrVehicle.door_width?.toString() || "",
        door_height: hrVehicle.door_height?.toString() || "",
        main_driver_id: hrVehicle.main_driver_id?.toString() || "",
        secondary_driver_id: hrVehicle.secondary_driver_id?.toString() || "",
        equipment_ids:
          hrVehicle.equipment_ids?.map((id: number) => id.toString()) || [],
        license_expire_date: hrVehicle.license_expire_date?.split("T")[0] || "",
        insurance_expire_date:
          hrVehicle.insurance_expire_date?.split("T")[0] || "",
        truck_type: hrVehicle.truck_type?.toString() || "",
        license_expire_state: hrVehicle.license_expire_state?.toString() || "",
        high_dock: hrVehicle.high_dock?.toString() || "no",
      }
      setFormData(newFormData)
    }
  }, [hrVehicle, open, id])

  // Reset form when drawer closes
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setFormData(initialFormData)
      }, 300)
    }
  }, [open])

  const selectedEquipments = useMemo(() => {
    return formData.equipment_ids || []
  }, [formData.equipment_ids])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleMultiSelectChange = (values: string[]) => {
    setFormData((prev) => ({ ...prev, equipment_ids: values }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const submissionData = {
      ...formData,
      payload: formData.payload || null,
      gvw: formData.gvw || null,
      year: Number(formData.year) || null,
      length: Number(formData.length) || null,
      width: Number(formData.width) || null,
      height: Number(formData.height) || null,
      door_width: formData.door_width || null,
      door_height: Number(formData.door_height) || null,
      main_driver_id: formData.main_driver_id
        ? Number(formData.main_driver_id)
        : null,
      secondary_driver_id: formData.secondary_driver_id
        ? Number(formData.secondary_driver_id)
        : null,
      equipment_ids: formData.equipment_ids.map(Number),
      company_id: Number(localStorage.getItem("selected-company-id")) || null,
      owner_company_id: Number(params?.id) || null,
      id: hrVehicle?.id || "",
    }
    console.log(submissionData)

    update(submissionData as unknown as CreateVehicleSetupDto, {
      onSuccess: () => {
        closeDrawer()
      },
      onError: (error) => {
        console.error("Update failed:", error)
      },
    })
  }

  // Validate Select values
  const isValidMainDriver = hrDrivers?.items?.some(
    (driver) => driver.id.toString() === formData.main_driver_id,
  )
  const isValidSecondaryDriver = hrDrivers?.items?.some(
    (driver) => driver.id.toString() === formData.secondary_driver_id,
  )
  const isValidTruckType = TRUCK_TYPES.some(
    (type) => type.value === formData.truck_type,
  )
  const isValidLicenseState = states?.results?.some(
    (state) => state.name === formData.license_expire_state,
  )
  const isValidHighDock = HIGH_DOCK_OPTIONS.some(
    (option) => option.value === formData.high_dock,
  )

  const onChangeDocuments = (doc: DocumentFile[]) => {
    setFormData({ ...formData, documents: doc })
  }

  // Only render form when all data is loaded and valid
  const isFormReady =
    !isLoading &&
    !isLoadingDriversList &&
    !isLoadingState &&
    !isLoadingVehicleTools &&
    hrVehicle &&
    isValidMainDriver &&
    (isValidSecondaryDriver || !formData.secondary_driver_id) &&
    // isValidTruckType &&
    // isValidLicenseState &&
    isValidHighDock

  return (
    <Drawer open={open} onOpenChange={(state) => !state && closeDrawer()}>
      <DrawerOverlay className="data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out fixed inset-0 bg-black/40" />
      <DrawerContent className="data-[state=open]:animate-drawer-slide-left-and-fade data-[state=closed]:animate-drawer-slide-right-and-fade fixed right-0 top-0 z-50 h-screen w-full max-w-[95%] overflow-y-auto bg-gray-100 p-4 shadow-lg">
        <DrawerHeader className="w-full">
          <DrawerTitle className="pb-1 text-xl font-semibold">
            <div className="flex items-center justify-between">
              <div>Edit Vehicle</div>
              <div className="flex items-center gap-2">
                <DrawerClose asChild>
                  <Button
                    variant="secondary"
                    className="px-1 py-1"
                    disabled={isLoading || isPending}
                  >
                    <X />
                  </Button>
                </DrawerClose>
              </div>
            </div>
          </DrawerTitle>
        </DrawerHeader>

        <DrawerBody className="py-3">
          {!isFormReady ? (
            <AnimatePulse row={8} col={4} />
          ) : (
            <form onSubmit={handleSubmit}>
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

                  <HrVehicleDocuments
                    data={formData?.documents}
                    onChangeDocuments={onChangeDocuments}
                  />
                </div>

                {/* Right Side: Vehicle Info */}
                <div
                  className="rounded-md px-3"
                  style={{
                    width: "75%",
                    height: `calc(100vh - 130px)`,
                    overflowY: "auto",
                    paddingTop: "29px",
                  }}
                >
                  <div className="">
                    <h3 className="mb-1 text-lg font-bold">Drivers</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs" required>
                          Main Driver
                        </Label>
                        <Select
                          key={`main_driver_${formData.main_driver_id}`}
                          value={formData.main_driver_id || ""}
                          onValueChange={(value) =>
                            handleSelectChange("main_driver_id", value)
                          }
                          disabled={
                            isLoading || isPending || !hrDrivers?.items?.length
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select driver" />
                          </SelectTrigger>
                          <SelectContent>
                            {(hrDrivers?.items || []).map(
                              (option: { id: number; full_name: string }) => (
                                <SelectItem
                                  key={option.id}
                                  value={option.id.toString()}
                                >
                                  {option.full_name}
                                </SelectItem>
                              ),
                            )}
                          </SelectContent>
                        </Select>
                        {!isValidMainDriver && formData.main_driver_id && (
                          <p className="mt-1 text-xs text-red-500">
                            Invalid main driver selected
                          </p>
                        )}
                      </div>
                      <div>
                        <Label className="text-xs">Second Driver</Label>
                        <Select
                          key={`secondary_driver_${formData.secondary_driver_id}`}
                          value={formData.secondary_driver_id || ""}
                          onValueChange={(value) =>
                            handleSelectChange("secondary_driver_id", value)
                          }
                          disabled={
                            isLoading || isPending || !hrDrivers?.items?.length
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select driver" />
                          </SelectTrigger>
                          <SelectContent>
                            {(hrDrivers?.items || []).map(
                              (option: { id: number; full_name: string }) => (
                                <SelectItem
                                  key={option.id}
                                  value={option.id.toString()}
                                >
                                  {option.full_name}
                                </SelectItem>
                              ),
                            )}
                          </SelectContent>
                        </Select>
                        {!isValidSecondaryDriver &&
                          formData.secondary_driver_id && (
                            <p className="mt-1 text-xs text-red-500">
                              Invalid secondary driver selected
                            </p>
                          )}
                      </div>
                    </div>
                  </div>

                  <h3 className="mb-1 mt-4 text-lg font-bold">Vehicle Info</h3>

                  <div className="grid grid-cols-3 gap-3">
                    {/* Row 1 */}
                    <div>
                      <Label className="text-xs" required>
                        Type
                      </Label>
                      <Select
                        key={`truck_type_${formData.truck_type}`}
                        value={formData.truck_type || ""}
                        onValueChange={(value) =>
                          handleSelectChange("truck_type", value)
                        }
                        disabled={isLoading || isPending}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Type" />
                        </SelectTrigger>
                        <SelectContent>
                          {TRUCK_TYPES.map(
                            (option: { value: string; label: string }) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                      {!isValidTruckType && formData.truck_type && (
                        <p className="mt-1 text-xs text-red-500">
                          Invalid truck type selected
                        </p>
                      )}
                    </div>
                    <div>
                      <Label className="text-xs" required>
                        Make
                      </Label>
                      <Input
                        name="make"
                        value={formData.make || ""}
                        onChange={handleInputChange}
                        placeholder="Enter Make"
                        disabled={isLoading || isPending}
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-xs" required>
                        Model
                      </Label>
                      <Input
                        name="model"
                        value={formData.model || ""}
                        onChange={handleInputChange}
                        placeholder="Enter Model"
                        disabled={isLoading || isPending}
                        required
                      />
                    </div>

                    {/* Row 2 */}
                    <div>
                      <Label className="text-xs" required>
                        Payload (lbs)
                      </Label>
                      <Input
                        type="number"
                        name="payload"
                        value={formData.payload || ""}
                        onChange={handleInputChange}
                        placeholder="Enter Payload"
                        disabled={isLoading || isPending}
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-xs" required>
                        GVW (lbs)
                      </Label>
                      <Input
                        type="number"
                        name="gvw"
                        value={formData.gvw || ""}
                        onChange={handleInputChange}
                        placeholder="Enter GVW"
                        disabled={isLoading || isPending}
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-xs" required>
                        Vehicle Year
                      </Label>
                      <Input
                        type="number"
                        name="year"
                        value={formData.year || ""}
                        onChange={handleInputChange}
                        placeholder="Enter Year"
                        disabled={isLoading || isPending}
                        required
                      />
                    </div>

                    {/* Row 3 */}
                    <div>
                      <Label className="text-xs" required>
                        License Plate
                      </Label>
                      <Input
                        name="plate"
                        value={formData.plate || ""}
                        onChange={handleInputChange}
                        placeholder="Enter License Plate"
                        disabled={isLoading || isPending}
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-xs" required>
                        License Expiry Date
                      </Label>
                      <DatePicker
                        locale="en-GB"
                        wrapperClassName="w-full"
                        className={`w-full rounded-md border px-3 py-2 text-sm shadow-sm outline-none ${
                          formData?.license_expire_date &&
                          dayjs(formData?.license_expire_date).isBefore(
                            dayjs(),
                            "day",
                          )
                            ? "border-red-500 focus:border-red-500 dark:border-red-500 dark:focus:border-red-500"
                            : "border-gray-300 focus:border-blue-500 dark:border-gray-800 dark:focus:border-blue-400"
                        } dark:bg-gray-950 dark:text-gray-100 dark:focus:ring-blue-500/40`}
                        calendarClassName="rounded-xl shadow-lg text-sm bg-white dark:bg-gray-900 dark:text-gray-100"
                        selected={
                          formData?.license_expire_date
                            ? dayjs(formData?.license_expire_date).toDate()
                            : null
                        }
                        onChange={(date) => {
                          if (date) {
                            setFormData((prev) => ({
                              ...prev,
                              license_expire_date:
                                dayjs(date).format("YYYY-MM-DD"),
                            }))
                          }
                        }}
                        dateFormat="MMMM d, yyyy"
                        placeholderText="Select date"
                        required
                      />

                      {/* <DatePicker
                        locale="en-GB"
                        wrapperClassName="w-full"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm outline-none focus:border-blue-500 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-100 dark:focus:border-blue-400 dark:focus:ring-blue-500/40"
                        calendarClassName="rounded-xl shadow-lg text-sm bg-white dark:bg-gray-900 dark:text-gray-100"
                        selected={
                          formData.license_expire_date
                            ? dayjs(formData.license_expire_date).toDate()
                            : null
                        }
                        onChange={(date) => {
                          if (date) {
                            setFormData((prev) => ({
                              ...prev,
                              license_expire_date:
                                dayjs(date).format("YYYY-MM-DD"),
                            }))
                          }
                        }}
                        dateFormat="MMMM d, yyyy"
                        placeholderText="Select date"
                        required
                      /> */}
                    </div>
                    <div>
                      <Label className="text-xs" required>
                        License State
                      </Label>
                      <Select
                        key={`license_state_${formData.license_expire_state}`}
                        value={formData.license_expire_state || ""}
                        onValueChange={(value) =>
                          handleSelectChange("license_expire_state", value)
                        }
                        disabled={
                          isLoading || isPending || !states?.results?.length
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select State" />
                        </SelectTrigger>
                        <SelectContent>
                          {(states?.results || []).map(
                            (option: {
                              id: number
                              short_name: string
                              name: string
                            }) => (
                              <SelectItem key={option.id} value={option.name}>
                                {option.short_name}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                      {!isValidLicenseState &&
                        formData.license_expire_state && (
                          <p className="mt-1 text-xs text-red-500">
                            Invalid license state selected
                          </p>
                        )}
                    </div>

                    {/* Row 4 */}
                    <div>
                      <Label className="text-xs" required>
                        Insurance Company
                      </Label>
                      <Input
                        name="insurance_company"
                        value={formData.insurance_company || ""}
                        onChange={handleInputChange}
                        placeholder="Enter Insurance Company"
                        disabled={isLoading || isPending}
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-xs" required>
                        Insurance Expiry Date
                      </Label>
                      <DatePicker
                        locale="en-GB"
                        wrapperClassName="w-full"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm outline-none focus:border-blue-500 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-100 dark:focus:border-blue-400 dark:focus:ring-blue-500/40"
                        calendarClassName="rounded-xl shadow-lg text-sm bg-white dark:bg-gray-900 dark:text-gray-100"
                        selected={
                          formData.insurance_expire_date
                            ? dayjs(formData.insurance_expire_date).toDate()
                            : null
                        }
                        onChange={(date) => {
                          if (date) {
                            setFormData((prev) => ({
                              ...prev,
                              insurance_expire_date:
                                dayjs(date).format("YYYY-MM-DD"),
                            }))
                          }
                        }}
                        dateFormat="MMMM d, yyyy"
                        placeholderText="Select date"
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-xs" required>
                        Policy
                      </Label>
                      <Input
                        name="policy"
                        value={formData.policy || ""}
                        onChange={handleInputChange}
                        placeholder="Enter Policy"
                        disabled={isLoading || isPending}
                        required
                      />
                    </div>

                    {/* Row 5 */}
                    <div>
                      <Label className="text-xs" required>
                        Vehicle VIN
                      </Label>
                      <Input
                        name="vehicle_vin"
                        value={formData.vehicle_vin || ""}
                        onChange={handleInputChange}
                        placeholder="Enter Vehicle VIN"
                        disabled={isLoading || isPending}
                        required
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="mb-1 text-lg font-bold">
                      Useful Cargo Dimensions (Inches)
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label className="text-xs" required>
                          Length
                        </Label>
                        <Input
                          type="number"
                          name="length"
                          value={formData.length || ""}
                          onChange={handleInputChange}
                          placeholder="Enter Length"
                          disabled={isLoading || isPending}
                          required
                        />
                      </div>
                      <div>
                        <Label className="text-xs" required>
                          Width
                        </Label>
                        <Input
                          type="number"
                          name="width"
                          value={formData.width || ""}
                          onChange={handleInputChange}
                          placeholder="Enter Width"
                          disabled={isLoading || isPending}
                          required
                        />
                      </div>
                      <div>
                        <Label className="text-xs" required>
                          Height
                        </Label>
                        <Input
                          type="number"
                          name="height"
                          value={formData.height || ""}
                          onChange={handleInputChange}
                          placeholder="Enter Height"
                          disabled={isLoading || isPending}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="mb-1 text-lg font-bold">Door Open</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label className="text-xs" required>
                          Width
                        </Label>
                        <Input
                          type="number"
                          name="door_width"
                          value={formData.door_width || ""}
                          onChange={handleInputChange}
                          placeholder="Enter Door Width"
                          disabled={isLoading || isPending}
                          required
                        />
                      </div>
                      <div>
                        <Label className="text-xs" required>
                          Height
                        </Label>
                        <Input
                          type="number"
                          name="door_height"
                          value={formData.door_height || ""}
                          onChange={handleInputChange}
                          placeholder="Enter Door Height"
                          disabled={isLoading || isPending}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="mb-1 text-lg font-bold">
                      Equipment & Dock Height
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label className="text-xs">Equipment</Label>
                        <MultiSelect
                          options={(vehicleTools || []).map(
                            (item: { id: string; name: string }) => ({
                              label: item.name,
                              value: item.id.toString(),
                            }),
                          )}
                          value={selectedEquipments}
                          onValueChange={handleMultiSelectChange}
                          placeholder="Select equipment"
                          disabled={
                            isLoading || isPending || !vehicleTools?.length
                          }
                        />
                      </div>
                      <div className="relative">
                        <Label className="text-xs">Dock Height/Ramps</Label>
                        <Select
                          key={`high_dock_${formData.high_dock}`}
                          value={formData.high_dock || ""}
                          onValueChange={(value) =>
                            handleSelectChange("high_dock", value)
                          }
                          disabled={isLoading || isPending}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Dock Height/Ramps" />
                          </SelectTrigger>
                          <SelectContent>
                            {HIGH_DOCK_OPTIONS.map(
                              (option: { value: string; label: string }) => (
                                <SelectItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </SelectItem>
                              ),
                            )}
                          </SelectContent>
                        </Select>
                        {!isValidHighDock && formData.high_dock && (
                          <p className="mt-1 text-xs text-red-500">
                            Invalid dock height selected
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="my-4 flex justify-end">
                    <Button
                      type="submit"
                      className="px-5 py-1"
                      disabled={isLoading || isPending}
                    >
                      {isPending ? "Updating..." : "Update Vehicle"}
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
