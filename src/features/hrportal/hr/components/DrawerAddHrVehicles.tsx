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
import { useEffect, useState } from "react"
import { getSuccessMessage } from "@/lib/getSuccessMessage"
import { useCreateHrVehicles } from "../hooks/useCreateHrVehicles"
import { CreateVehicleSetupDto } from "../types"
import { useParams } from "next/navigation"
import DatePicker from "react-datepicker"
import { formatDate } from "date-fns"
import dayjs from "dayjs"
import HrVehicleDocuments, { DocumentFile } from "./HrVehicleDocuments"
import { useToastMessage } from "@/hooks/useToastMessage"

export function DrawerAddHrVehicles({
  open,
  closeDrawer,
}: {
  open: boolean
  closeDrawer: () => void
}) {
    const {getErrorMessage,getSuccessMessage} = useToastMessage()
  const { hrDrivers, isLoadingDriversList } = useHrDriversList()
  const { states, isLoadingState } = useStates()
  const { vehicleTools, isLoadingVehicleTools } = useHrVehicleTools()
  const { create, isPending } = useCreateHrVehicles()
  const params = useParams()
  const [formData, setFormData] = useState<CreateVehicleSetupDto>({
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
    documents: [],
  })

  useEffect(() => {
    if (!open) {
      setFormData({
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
        documents: [],
      })
    }
  }, [open])

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
      payload: Number(formData.payload),
      gvw: Number(formData.gvw),
      year: Number(formData.year),
      length: Number(formData.length),
      width: Number(formData.width),
      height: Number(formData.height),
      door_width: Number(formData.door_width),
      door_height: Number(formData.door_height),
      main_driver_id: formData.main_driver_id
        ? Number(formData.main_driver_id)
        : null,
      secondary_driver_id: formData.secondary_driver_id
        ? Number(formData.secondary_driver_id)
        : null,
      equipment_ids: formData.equipment_ids.map(Number),
      license_expire_state: formData.license_expire_state,
      company_id: Number(localStorage.getItem("selected-company-id")),
      owner_company_id: Number(params?.id),
    }
    create(submissionData as unknown as CreateVehicleSetupDto, {
      onSuccess: () => {
        getSuccessMessage("Vehicle created successfully!")
        closeDrawer()
        setFormData({
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
          high_dock: "",
          vehicle_registration_document: "",
          insurance_certificate: "",
          photo_left_side: "",
          photo_right_side: "",
          cargo_space_photo: "",
          main_driver_id: "",
          secondary_driver_id: "",
          equipment_ids: [],
          documents: [],
        })
      },
    })
  }

  const onChangeDocuments = (doc: DocumentFile[]) => {
    setFormData({ ...formData, documents: doc })
  }

  const isLoading =
    isLoadingDriversList || isLoadingState || isLoadingVehicleTools || isPending

  return (
    <Drawer open={open} onOpenChange={(state) => !state && closeDrawer()}>
      <DrawerOverlay className="data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out fixed inset-0 bg-black/40" />
      <DrawerContent className="data-[state=open]:animate-drawer-slide-left-and-fade data-[state=closed]:animate-drawer-slide-right-and-fade fixed right-0 top-0 z-50 h-screen w-full max-w-[95%] overflow-y-auto bg-gray-100 p-4 shadow-lg">
        <DrawerHeader className="w-full">
          <DrawerTitle className="pb-1 text-xl font-semibold">
            <div className="flex items-center justify-between">
              <div>Create Vehicle</div>
              <div className="flex items-center gap-2">
                <DrawerClose asChild>
                  <Button
                    variant="secondary"
                    className="px-1 py-1"
                    disabled={isLoading}
                  >
                    <X />
                  </Button>
                </DrawerClose>
              </div>
            </div>
          </DrawerTitle>
        </DrawerHeader>

        <DrawerBody className="py-3">
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
                        value={formData.main_driver_id}
                        onValueChange={(value) =>
                          handleSelectChange("main_driver_id", value)
                        }
                        disabled={isLoading}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select driver" />
                        </SelectTrigger>
                        <SelectContent>
                          {isLoadingDriversList ? (
                            <div className="p-2 text-center text-gray-500">
                              Loading...
                            </div>
                          ) : (
                            (hrDrivers ? hrDrivers.items : [])?.map(
                              (option: { id: number; full_name: string }) => (
                                <SelectItem
                                  key={option.id}
                                  value={option.id.toString()}
                                >
                                  {option.full_name}
                                </SelectItem>
                              ),
                            )
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs">Second Driver</Label>
                      <Select
                        value={formData.secondary_driver_id}
                        onValueChange={(value) =>
                          handleSelectChange("secondary_driver_id", value)
                        }
                        disabled={isLoading}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select driver" />
                        </SelectTrigger>
                        <SelectContent>
                          {isLoadingDriversList ? (
                            <div className="p-2 text-center text-gray-500">
                              Loading...
                            </div>
                          ) : (
                            (hrDrivers ? hrDrivers.items : [])?.map(
                              (option: { id: number; full_name: string }) => (
                                <SelectItem
                                  key={option.id}
                                  value={option.id.toString()}
                                >
                                  {option.full_name}
                                </SelectItem>
                              ),
                            )
                          )}
                        </SelectContent>
                      </Select>
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
                      value={formData.truck_type}
                      onValueChange={(value) =>
                        handleSelectChange("truck_type", value)
                      }
                      disabled={isLoading}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {TRUCK_TYPES.map(
                          (option: { value: string; label: string }) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs" required>
                      Make
                    </Label>
                    <Input
                      name="make"
                      value={formData.make}
                      onChange={handleInputChange}
                      placeholder="Enter Make"
                      disabled={isLoading}
                      required
                    />
                  </div>
                  <div>
                    <Label className="text-xs" required>
                      Model
                    </Label>
                    <Input
                      name="model"
                      value={formData.model}
                      onChange={handleInputChange}
                      placeholder="Enter Model"
                      disabled={isLoading}
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
                      value={formData.payload}
                      onChange={handleInputChange}
                      placeholder="Enter Payload"
                      disabled={isLoading}
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
                      value={formData.gvw}
                      onChange={handleInputChange}
                      placeholder="Enter GVW"
                      disabled={isLoading}
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
                      value={formData.year}
                      onChange={handleInputChange}
                      placeholder="Enter Year"
                      disabled={isLoading}
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
                      value={formData.plate}
                      onChange={handleInputChange}
                      placeholder="Enter License Plate"
                      disabled={isLoading}
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
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm outline-none focus:border-blue-500 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-100 dark:focus:border-blue-400 dark:focus:ring-blue-500/40"
                      calendarClassName="rounded-xl shadow-lg text-sm bg-white dark:bg-gray-900 dark:text-gray-100"
                      selected={
                        formData.license_expire_date
                          ? new Date(formData.license_expire_date)
                          : null
                      }
                      onChange={(date) => {
                        if (date) {
                          setFormData((prev) => ({
                            ...prev,
                            license_expire_date:
                              dayjs(date).format("YYYY-MM-DD HH:mm"),
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
                      License State
                    </Label>
                    <Select
                      name="license_expire_state"
                      value={formData.license_expire_state}
                      onValueChange={(value) =>
                        handleSelectChange("license_expire_state", value)
                      }
                      disabled={isLoading}
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

                  {/* Row 4 */}
                  <div>
                    <Label className="text-xs" required>
                      Insurance Company
                    </Label>
                    <Input
                      name="insurance_company"
                      value={formData.insurance_company}
                      onChange={handleInputChange}
                      placeholder="Enter Insurance Company"
                      disabled={isLoading}
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
                          ? new Date(formData.insurance_expire_date)
                          : null
                      }
                      onChange={(date) => {
                        if (date) {
                          setFormData((prev) => ({
                            ...prev,
                            insurance_expire_date:
                              dayjs(date).format("YYYY-MM-DD HH:mm"),
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
                      type="text"
                      name="policy"
                      value={formData.policy}
                      onChange={handleInputChange}
                      placeholder="Enter Policy"
                      disabled={isLoading}
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
                      value={formData.vehicle_vin}
                      onChange={handleInputChange}
                      placeholder="Enter Vehicle VIN"
                      disabled={isLoading}
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
                        value={formData.length}
                        onChange={handleInputChange}
                        placeholder="Enter Length"
                        disabled={isLoading}
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
                        value={formData.width}
                        onChange={handleInputChange}
                        placeholder="Enter Width"
                        disabled={isLoading}
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
                        value={formData.height}
                        onChange={handleInputChange}
                        placeholder="Enter Height"
                        disabled={isLoading}
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
                        value={formData.door_width}
                        onChange={handleInputChange}
                        placeholder="Enter Door Width"
                        disabled={isLoading}
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
                        value={formData.door_height}
                        onChange={handleInputChange}
                        placeholder="Enter Door Height"
                        disabled={isLoading}
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
                        options={(vehicleTools ? vehicleTools : []).map(
                          (item: { id: string; name: string }) => ({
                            label: item.name,
                            value: item.id.toString(),
                          }),
                        )}
                        value={formData.equipment_ids}
                        onValueChange={handleMultiSelectChange}
                        placeholder="Select equipment"
                      />
                    </div>
                    <div className="relative">
                      <Label className="text-xs">Dock Height/Ramps</Label>
                      <Select
                        value={formData.high_dock}
                        onValueChange={(value) =>
                          handleSelectChange("high_dock", value)
                        }
                        disabled={isLoading}
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
                    </div>
                  </div>
                </div>

                <div className="my-4 flex justify-end">
                  <Button
                    type="submit"
                    className="px-5 py-1"
                    disabled={isLoading}
                  >
                    {isLoading ? "Saving..." : "Save Vehicle"}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
