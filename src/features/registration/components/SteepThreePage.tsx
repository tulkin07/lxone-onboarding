"use client"

import { Button } from "@/components/Button"
import { Label } from "@/components/Label"
import RegistrationDocuments, {
  type DocumentFile,
} from "@/features/registration/components/RegistrationDocuments"
import { useCreateRegisterationFiles } from "../hooks/useCreateRegisterationFiles"
import { useRouter, useSearchParams } from "next/navigation"
import React, { useState } from "react"

/**
 * `file_type` backendga raqam ko‘rinishida ketadi; har bo‘lim o‘zidan 1… boshlanadi,
 * chunki ajratish `driver_company_files` / `driver_files` / `vehicle_files` massivlari bilan bo‘ladi.
 */
const FILE = {
  company: {
    void_check: "1",
    mc_usdot: "2",
    extra_attachments: "3",
  },
  driver: {
    driver_license: "1",
    driving_record: "2",
    green_card: "3",
  },
  vehicle: {
    insurance: "1",
    vehicle_registration: "2",
    photo_left: "3",
    photo_right: "4",
    cargo_photo: "5",
  },
} as const

type DocumentsState = {
  void_check: DocumentFile[]
  mc_usdot: DocumentFile[]
  extra_attachments: DocumentFile[]
  driver_license: DocumentFile[]
  driving_record: DocumentFile[]
  green_card: DocumentFile[]
  insurance: DocumentFile[]
  vehicle_registration: DocumentFile[]
  photo_left: DocumentFile[]
  photo_right: DocumentFile[]
  cargo_photo: DocumentFile[]
}

const emptyDocs = (): DocumentsState => ({
  void_check: [],
  mc_usdot: [],
  extra_attachments: [],
  driver_license: [],
  driving_record: [],
  green_card: [],
  insurance: [],
  vehicle_registration: [],
  photo_left: [],
  photo_right: [],
  cargo_photo: [],
})

export default function SteepThreePage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { mutate, isPending } = useCreateRegisterationFiles()
  const [documents, setDocuments] = useState<DocumentsState>(emptyDocs)

  const handleDocumentsChange = <K extends keyof DocumentsState>(
    key: K,
    files: DocumentFile[],
  ) => {
    setDocuments((prev) => ({ ...prev, [key]: files }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const ids = JSON.parse(localStorage.getItem("registration_ids") || "{}")

    const { driver_id, vehicle_id, company_id, driver_company_id } = ids

    const driver_files = [
      ...documents.driver_license,
      ...documents.driving_record,
      ...documents.green_card,
    ].map((file) => ({
      file: file.file,
      file_type: file.file_type,
      driver_id,
      company_id,
    }))

    const vehicle_files = [
      ...documents.insurance,
      ...documents.vehicle_registration,
      ...documents.photo_left,
      ...documents.photo_right,
      ...documents.cargo_photo,
    ].map((file) => ({
      file: file.file,
      file_type: file.file_type,
      vehicle_id,
      company_id,
    }))

    const driver_company_files = [
      ...documents.void_check,
      ...documents.mc_usdot,
      ...documents.extra_attachments,
    ].map((file) => ({
      file: file.file,
      file_type: file.file_type,
      driver_company_id,
      company_id,
    }))

    const payload = {
      driver_files,
      vehicle_files,
      driver_company_files,
    }
    console.log(payload)
    // mutate(payload, {
    //   onSuccess: () => {
    //     router.push(`/step-finish?token=${searchParams.get("token")}`)
    //   },
    // })
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="mt-4 space-y-6">
        <h2 className="text-lg font-semibold">Company</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <Label>Void Check</Label>
            <RegistrationDocuments
              fileType={FILE.company.void_check}
              data={documents.void_check}
              onChangeDocuments={(files) =>
                handleDocumentsChange("void_check", files)
              }
            />
          </div>

          <div>
            <Label>MC and USDOT</Label>
            <RegistrationDocuments
              fileType={FILE.company.mc_usdot}
              data={documents.mc_usdot}
              onChangeDocuments={(files) =>
                handleDocumentsChange("mc_usdot", files)
              }
            />
          </div>

          <div>
            <Label>Extra attachments</Label>
            <RegistrationDocuments
              fileType={FILE.company.extra_attachments}
              data={documents.extra_attachments}
              onChangeDocuments={(files) =>
                handleDocumentsChange("extra_attachments", files)
              }
            />
          </div>
        </div>

        <h2 className="text-lg font-semibold">Driver</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <Label>Driver License</Label>
            <RegistrationDocuments
              fileType={FILE.driver.driver_license}
              data={documents.driver_license}
              onChangeDocuments={(files) =>
                handleDocumentsChange("driver_license", files)
              }
            />
          </div>

          <div>
            <Label>Driving Record</Label>
            <RegistrationDocuments
              fileType={FILE.driver.driving_record}
              data={documents.driving_record}
              onChangeDocuments={(files) =>
                handleDocumentsChange("driving_record", files)
              }
            />
          </div>

          <div>
            <Label>Green card &amp; Passport</Label>
            <RegistrationDocuments
              fileType={FILE.driver.green_card}
              data={documents.green_card}
              onChangeDocuments={(files) =>
                handleDocumentsChange("green_card", files)
              }
            />
          </div>
        </div>

        <h2 className="text-lg font-semibold">Vehicle</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label>Insurance</Label>
            <RegistrationDocuments
              fileType={FILE.vehicle.insurance}
              data={documents.insurance}
              onChangeDocuments={(files) =>
                handleDocumentsChange("insurance", files)
              }
            />
          </div>

          <div>
            <Label>Vehicle Registration</Label>
            <RegistrationDocuments
              fileType={FILE.vehicle.vehicle_registration}
              data={documents.vehicle_registration}
              onChangeDocuments={(files) =>
                handleDocumentsChange("vehicle_registration", files)
              }
            />
          </div>
        </div>

        <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200">
          Upload your vehicle photos
        </h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <Label>Photo Left Side</Label>
            <RegistrationDocuments
              fileType={FILE.vehicle.photo_left}
              data={documents.photo_left}
              onChangeDocuments={(files) =>
                handleDocumentsChange("photo_left", files)
              }
            />
          </div>

          <div>
            <Label>Photo Right Side</Label>
            <RegistrationDocuments
              fileType={FILE.vehicle.photo_right}
              data={documents.photo_right}
              onChangeDocuments={(files) =>
                handleDocumentsChange("photo_right", files)
              }
            />
          </div>

          <div>
            <Label>Cargo space photo</Label>
            <RegistrationDocuments
              fileType={FILE.vehicle.cargo_photo}
              data={documents.cargo_photo}
              onChangeDocuments={(files) =>
                handleDocumentsChange("cargo_photo", files)
              }
            />
          </div>
        </div>

        <Button type="submit" className="w-full" isLoading={isPending}>
          {isPending ? "Submitting..." : "Continue"}
        </Button>
      </form>
    </div>
  )
}
