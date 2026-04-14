"use client"
import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { Label } from "@/components/Label"
import { MultiSelect } from "@/components/MultiSelect"
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Select"
import { HIGH_DOCK_OPTIONS } from "@/constants/constants"
import { useRegistration } from "@/context/RegisterationContext"
import { useCreateRegisteration } from "@/features/registration/hooks/useCreateRegisteration"
import { useHrVehicleTools } from "@/features/registration/hooks/useHrVehicleTools"
import { Select } from "@radix-ui/react-select"
import { useRouter } from "next/navigation"
import React from "react"
import VehicleYearSelect from "@/components/VehicleYearSelect"
import { useStates } from "@/features/registration/hooks/useState"
import { DatePickerInput } from "@mantine/dates"
import dayjs from "dayjs"

export default function StepTwoPage({ token }: { token: string }) {
  const router = useRouter()
  const { data, updateData } = useRegistration()
  const { vehicleTools } = useHrVehicleTools()
  const { states, isLoadingState } = useStates()
  const { mutate, isPending } = useCreateRegisteration()
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const item = {
      ...data,
      driver: {
        ...data.driver,
        full_name: data.company_name,
        phone_number: data.company_phone,
      },
      emergency_phone_number: data.company_phone,
      owner_phone: data.company_phone,
    }
    mutate(
      { item, token: token },
      {
        onSuccess: (d) => {
          localStorage.setItem("registration_ids",JSON.stringify(d))
          router.push(`/step-three?token=${token}`)
        },
      },
    )
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="mt-4 w-full">
        <div className="mb-6">
          <h2 className="mb-4 text-lg font-semibold dark:text-gray-400">
            Driver license
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <Label required>License number</Label>
              <Input
                required
                type="text"
                placeholder="License number"
                value={data.driver.license_number}
                onChange={(e) =>
                  updateData({
                    driver: { ...data.driver, license_number: e.target.value },
                  })
                }
              />
            </div>

            <div>
              <Label required>License type</Label>
              <Input
                required
                type="text"
                placeholder="License type"
                value={data.driver.license_type}
                onChange={(e) =>
                  updateData({
                    driver: { ...data.driver, license_type: e.target.value },
                  })
                }
              />
            </div>

            <div className="relative">
              <Label required>License state</Label>
              <Select
                required
                value={data.driver.license_state}
                onValueChange={(e: string) =>
                  updateData({
                    driver: { ...data.driver, license_state: e },
                  })
                }
              >
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
                        <SelectItem
                          key={option.id}
                          value={option?.name}
                        >
                          {option.name}
                        </SelectItem>
                      ),
                    )
                  )}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label required>License expiration date</Label>
              <DatePickerInput
                value={
                  data.driver.license_expiration_date
                    ? dayjs(data.driver.license_expiration_date).toDate()
                    : null
                }
                onChange={(d) =>
                  updateData({
                    driver: {
                      ...data.driver,
                      license_expiration_date: d
                        ? dayjs(d).format("YYYY-MM-DD")
                        : null,
                    },
                  })
                }
                valueFormat="MMMM D, YYYY"
                placeholder="Select expiration date"
                maxDate={new Date(2100, 11, 31)}
                minDate={new Date(1900, 0, 1)}
                w="100%"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-lg font-semibold dark:text-gray-400">
            Vehicle info
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <Label required>Make and Model</Label>
              <Input
                value={data.vehicle.make}
                onChange={(e) => {
                  updateData({
                    vehicle: { ...data.vehicle, make: e.target.value },
                  })
                }}
                required
                type="text"
                placeholder="Make"
              />
            </div>

            <div>
              <Label className="mb-1 block text-sm font-medium text-gray-700">
                &nbsp;
              </Label>
              <Input
                required
                type="text"
                placeholder="Model"
                value={data.vehicle.model}
                onChange={(e) => {
                  updateData({
                    vehicle: { ...data.vehicle, model: e.target.value },
                  })
                }}
              />
            </div>

            <div>
              <Label
                required
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Door Dimensions
              </Label>
              <Input
                value={data.vehicle.door_width}
                onChange={(e) => {
                  updateData({
                    vehicle: { ...data.vehicle, door_width: e.target.value },
                  })
                }}
                min={0}
                required
                type="number"
                placeholder="Width"
              />
            </div>

            <div>
              <Label className="mb-1 block text-sm font-medium text-gray-700">
                &nbsp;
              </Label>
              <Input
                value={data.vehicle.door_height}
                onChange={(e) => {
                  updateData({
                    vehicle: { ...data.vehicle, door_height: e.target.value },
                  })
                }}
                required
                min={0}
                type="number"
                placeholder="Height"
              />
            </div>

            <div className="relative">
              <Label
                required
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Equipment & Dock Height
              </Label>
              <MultiSelect
                options={(vehicleTools || []).map(
                  (item: { id: string; name: string }) => ({
                    label: item.name,
                    value: item.id.toString(),
                  }),
                )}
                value={data.vehicle.equipment_ids}
                onValueChange={(e) =>
                  updateData({ vehicle: { ...data.vehicle, equipment_ids: e } })
                }
                placeholder="Select equipment"
                // disabled={isLoading || isPending || !vehicleTools?.length}
              />
            </div>
            <div className="relative">
              <Label className="mb-1 block text-sm font-medium text-gray-700">
                &nbsp;
              </Label>
              <Select
                // key={`high_dock_${formData.high_dock}`}
                value={data.vehicle.high_dock || ""}
                onValueChange={(value) =>
                  updateData({ vehicle: { ...data.vehicle, high_dock: value } })
                }
                // disabled={isLoading || isPending}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Dock Height/Ramps" />
                </SelectTrigger>
                <SelectContent>
                  {HIGH_DOCK_OPTIONS.map(
                    (option: { value: string; label: string }) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div>
              <Label
                required
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Useful Cargo Dimensions (Inches)
              </Label>
              <Input
                value={data.vehicle.length}
                onChange={(e) => {
                  updateData({
                    vehicle: { ...data.vehicle, length: e.target.value },
                  })
                }}
                required
                min={0}
                type="number"
                placeholder="Length"
              />
            </div>
            <div>
              <Label className="mb-1 block text-sm font-medium text-gray-700">
                &nbsp;
              </Label>
              <Input
                value={data.vehicle.width}
                onChange={(e) => {
                  updateData({
                    vehicle: { ...data.vehicle, width: e.target.value },
                  })
                }}
                required
                min={0}
                type="number"
                placeholder="Width "
              />
            </div>
            <div>
              <Label className="mb-1 block text-sm font-medium text-gray-700">
                &nbsp;
              </Label>
              <Input
                value={data.vehicle.height}
                onChange={(e) => {
                  updateData({
                    vehicle: { ...data.vehicle, height: e.target.value },
                  })
                }}
                required
                min={0}
                type="number"
                placeholder="Height"
              />
            </div>
          </div>
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <Label
                required
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Payload and GVW
              </Label>
              <Input
                value={data.vehicle.payload}
                onChange={(e) => {
                  updateData({
                    vehicle: { ...data.vehicle, payload: e.target.value },
                  })
                }}
                required
                min={0}
                type="number"
                placeholder="Payload (lbs)"
              />
            </div>
            <div>
              <Label className="mb-1 block text-sm font-medium text-gray-700">
                &nbsp;
              </Label>
              <Input
                value={data.vehicle.gvw}
                min={0}
                onChange={(e) => {
                  updateData({
                    vehicle: { ...data.vehicle, gvw: e.target.value },
                  })
                }}
                required
                type="number"
                placeholder="GVW (lbs) "
              />
            </div>
          </div>
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="relative">
              <Label
                required
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Year
              </Label>
              <VehicleYearSelect
                required
                value={data.vehicle.year}
                onChange={(year) =>
                  updateData({
                    vehicle: { ...data.vehicle, year },
                  })
                }
                placeholder="Select model year"
              />
            </div>
          </div>
        </div>

        <div>
          <Button
            className="mt-4 w-full disabled:bg-gray-200 disabled:text-gray-500"
            type="submit"
            aria-disabled={isPending}
            isLoading={isPending}
          >
            {isPending ? "Submitting..." : "Continue"}
          </Button>
        </div>
      </form>
    </div>
  )
}
