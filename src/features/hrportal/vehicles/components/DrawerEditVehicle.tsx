"use client"

import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerTitle,
} from "@/components/Drawer"
import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { Label } from "@/components/Label"
import AnimatePulse from "@/components/AnimatePulse"
import { Info, InfoIcon, X } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { useEffect } from "react"
import {
  TRUCK_TYPES,
  VEHICLE_STATUS_STYLES,
  VEHICLE_STATUS_STYLES_ARRAY,
} from "@/constants/constants"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Select"
import { useUpdateVehicle } from "../hooks/useUpdateVehicle"

export function DrawerEditVehicle({
  open,
  closeDrawer,
  data,
  isLoading,
}: {
  open: boolean
  closeDrawer: () => void
  data: any
  isLoading: boolean
}) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      truck_type: "",
      make: "",
      model: "",
      payload: 0,
      year: 0,
      plate: "",
      license_expire_date: "",
      license_expire_state: "",
      vehicle_vin: "",
      insurance_expire_date: "",
      main_driver_id: "",
      secondary_driver_id: "",
      owner_company_id: "",
      status: "",
      width: "",
      location: "",
      location_updated_at: "",
      service_status: "",
      note: "",
    },
  })
  const { update, isPending } = useUpdateVehicle()
  useEffect(() => {
    if (data) {
      reset({
        truck_type:
          TRUCK_TYPES.find((item) => item.value == data?.truck_type)?.label ||
          "",
        make: data.make || "",
        model: data.model || "",
        payload: data.payload || 0,
        year: data.year || 0,
        plate: data.plate || "",
        license_expire_date: data.license_expire_date || "",
        license_expire_state: data.license_expire_state || "",
        vehicle_vin: data.vehicle_vin || "",
        insurance_expire_date: data.insurance_expire_date || "",
        main_driver_id: data.main_driver?.full_name || "",
        secondary_driver_id: data?.secondary_driver?.full_name || "No Driver",
        owner_company_id:
          data?.owner_company?.owner_second_name +
            ` ${data?.owner_company?.owner_first_name}` || "",
        width: data?.length + "x" + data?.width + "x" + data?.height || "",
        location: data?.location || "",
        location_updated_at: data?.location_updated_at || "",
        service_status: data?.service_status || "",
        note: data?.note || "",
      })
    }
  }, [data, reset])

  const onSubmit = (values: any) => {
    console.log("Form values:", values)
    update(
      {
        service_status: values?.service_status,
        note: values?.note,
        location: values?.location,
        id: data?.id,
      },
      {
        onSuccess: () => {
          closeDrawer()
        },
      },
    )
  }

  return (
    <Drawer open={open} onOpenChange={(state) => !state && closeDrawer()}>
      <DrawerOverlay className="fixed inset-0 bg-black/40" />
      <DrawerContent
        className="fixed right-0 top-0 z-50 w-full bg-gray-100 p-4 shadow-lg"
        style={{ width: "60%" }}
      >
        <DrawerHeader className="w-full">
          <DrawerTitle className="pb-1 text-xl font-semibold">
            <div className="flex items-center justify-between">
              <div>Update Status For Vehicle #{data?.id ?? ""}</div>
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
          {isLoading ? (
            <AnimatePulse row={8} col={4} />
          ) : (
            <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
              <div className="rounded-md px-3">
                <h3 className="mb-1 text-lg font-bold">Vehicle</h3>
                <div className="grid grid-cols-3 gap-3">
                  <InputField
                    label="Vehicle Type"
                    disabled
                    {...register("truck_type")}
                  />
                  <InputField
                    label="Vehicle Make"
                    disabled
                    {...register("make")}
                  />
                  <InputField
                    label="Vehicle Model"
                    disabled
                    {...register("model")}
                  />
                  <InputField
                    label="Payload (lbs)"
                    disabled
                    type="number"
                    {...register("payload")}
                  />
                  <InputField
                    label="Dimensions (LxWxH)"
                    disabled
                    type="text"
                    {...register("width")}
                  />
                  <InputField
                    label="Vehicle Year"
                    disabled
                    type="number"
                    {...register("year")}
                  />
                  <InputField
                    label="License Plate"
                    disabled
                    {...register("plate")}
                  />
                  <InputField
                    label="License Expiry Date"
                    disabled
                    type="date"
                    {...register("license_expire_date")}
                  />
                  <InputField
                    label="License State"
                    disabled
                    {...register("license_expire_state")}
                  />
                  <InputField
                    label="Vehicle VIN"
                    disabled
                    {...register("vehicle_vin")}
                  />
                  <InputField
                    label="Insurance Expiry Date"
                    disabled
                    type="date"
                    {...register("insurance_expire_date")}
                  />
                </div>
              </div>

              <div className="mt-4 px-3">
                <h3 className="mb-1 text-lg font-bold">Driver/Owner</h3>
                <div className="grid grid-cols-3 gap-3">
                  <InputField
                    label="Driver #1"
                    disabled
                    {...register("main_driver_id")}
                  >
                    <InfoIcon size={18} className="cursor-pointer" />
                  </InputField>
                  <InputField
                    label="Driver #2"
                    disabled
                    {...register("secondary_driver_id")}
                  >
                    {data?.secondary_driver_id && (
                      <InfoIcon size={18} className="cursor-pointer" />
                    )}
                  </InputField>
                  <InputField
                    label="Owner"
                    disabled
                    {...register("owner_company_id")}
                  >
                    <InfoIcon size={18} className="cursor-pointer" />
                  </InputField>
                </div>
              </div>

              <div className="mt-4 px-3">
                <h3 className="mb-1 text-lg font-bold">Availability Info</h3>
                <div className="grid grid-cols-3 gap-3">
                  <InputField label="Location" {...register("location")} />
                  <InputField label="Availability Note" {...register("note")} />
                  <div>
                    <Label>Status</Label>
                    <Select
                      defaultValue={
                        watch("service_status") || data?.service_status
                      }
                      onValueChange={(value) =>
                        setValue("service_status", value)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {VEHICLE_STATUS_STYLES_ARRAY.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <InputField
                    label="Updated Location"
                    disabled
                    {...register("location_updated_at")}
                  />
                </div>
              </div>

              <div className="my-4 flex justify-end">
                <Button type="submit" className="px-5 py-1">
                  {isPending ? "Loading..." : "Update"}
                </Button>
              </div>
            </form>
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

const InputField = ({
  label,
  children,
  ...rest
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div>
    <div className="mb-1 flex items-end justify-between gap-2">
      <Label className="relative flex gap-2 text-xs">{label}</Label>
      <span>{children}</span>
    </div>
    <Input {...rest} />
  </div>
)
