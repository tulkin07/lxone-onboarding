"use client";

import { Button } from "@/components/Button";
import { Label } from "@/components/Label";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import RegistrationDocuments from "@/features/registration/components/RegistrationDocuments";
import { useCreateRegisterationFiles } from "../hooks/useCreateRegisterationFiles";

export default function SteepThreePage() {
  const searchParams = useSearchParams()
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { mutate, isPending } = useCreateRegisterationFiles()
  const [documents, setDocuments] = useState<any>({
    voidCheck: [],
    mcUsdDot: [],
    driverLicense: [],
    drivingRecord: [],
    insurance: [],
    vehicleRegistration: [],
    greenCard: [],
    photoLeft: [],
    photoRight: [],
    cargoPhoto: [],
    extra: [],
  });

  const handleDocumentsChange = (key: string, files: any[]) => {
    setDocuments((prev: any) => ({
      ...prev,
      [key]: files,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const ids = JSON.parse(localStorage.getItem("registration_ids") || "{}");

    const {
      driver_id,
      vehicle_id,
      company_id,
      driver_company_id,
    } = ids;

    // =========================
    // DRIVER FILES
    // =========================
    const driver_files = [
      ...documents.driverLicense,
      ...documents.drivingRecord,
    ].map((file: any) => ({
      file: file.file,
      file_type: file.file_type,
      driver_id,
      company_id,
    }));

    // =========================
    // VEHICLE FILES
    // =========================
    const vehicle_files = [
      ...documents.insurance,
      ...documents.vehicleRegistration,
      ...documents.photoLeft,
      ...documents.photoRight,
      ...documents.cargoPhoto,
    ].map((file: any) => ({
      file: file.file,
      file_type: file.file_type,
      vehicle_id,
      company_id,
    }));

    // =========================
    // DRIVER COMPANY FILES
    // =========================
    const driver_company_files = [
      ...documents.voidCheck,
      ...documents.mcUsdDot,
      ...documents.greenCard,
      ...documents.extra,
    ].map((file: any) => ({
      file: file.file,
      file_type: file.file_type,
      driver_company_id,
      company_id,
    }));

    const payload = {
      driver_files,
      vehicle_files,
      driver_company_files,
    };

    mutate(payload, {
      onSuccess: () => {
        router.push(`/step-finish?token=${searchParams.get("token")}`);
      }
    })


  };

  return (
    <main className="mx-auto p-3">
      <form onSubmit={handleSubmit} className="mt-4 space-y-6">

        <h2 className="text-lg font-semibold">Company</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label>Void Check</Label>
            <RegistrationDocuments
              fileType="void_check"
              data={documents.voidCheck}
              onChangeDocuments={(files) =>
                handleDocumentsChange("voidCheck", files)
              }
            />
          </div>

          <div>
            <Label>MC and USDOT</Label>
            <RegistrationDocuments
              fileType="mc_usdot"
              data={documents.mcUsdDot}
              onChangeDocuments={(files) =>
                handleDocumentsChange("mcUsdDot", files)
              }
            />
          </div>
        </div>

        <h2 className="text-lg font-semibold">Driver</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label>Driver License</Label>
            <RegistrationDocuments
              fileType="driver_license"
              data={documents.driverLicense}
              onChangeDocuments={(files) =>
                handleDocumentsChange("driverLicense", files)
              }
            />
          </div>

          <div>
            <Label>Driving Record</Label>
            <RegistrationDocuments
              fileType="driving_record"
              data={documents.drivingRecord}
              onChangeDocuments={(files) =>
                handleDocumentsChange("drivingRecord", files)
              }
            />
          </div>
        </div>

        <h2 className="text-lg font-semibold">Vehicle</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <Label>Insurance</Label>
            <RegistrationDocuments
              fileType="insurance"
              data={documents.insurance}
              onChangeDocuments={(files) =>
                handleDocumentsChange("insurance", files)
              }
            />
          </div>

          <div>
            <Label>Vehicle Registration</Label>
            <RegistrationDocuments
              fileType="vehicle_registration"
              data={documents.vehicleRegistration}
              onChangeDocuments={(files) =>
                handleDocumentsChange("vehicleRegistration", files)
              }
            />
          </div>

          <div>
            <Label>Green card & Passport</Label>
            <RegistrationDocuments
              fileType="green_card"
              data={documents.greenCard}
              onChangeDocuments={(files) =>
                handleDocumentsChange("greenCard", files)
              }
            />
          </div>
        </div>

        <h2 className="text-lg font-semibold">Upload your vehicle photos</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <Label>Photo Left Side</Label>
            <RegistrationDocuments
              fileType="photo_left"
              data={documents.photoLeft}
              onChangeDocuments={(files) =>
                handleDocumentsChange("photoLeft", files)
              }
            />
          </div>

          <div>
            <Label>Photo Right Side</Label>
            <RegistrationDocuments
              fileType="photo_right"
              data={documents.photoRight}
              onChangeDocuments={(files) =>
                handleDocumentsChange("photoRight", files)
              }
            />
          </div>

          <div>
            <Label>Cargo space photo</Label>
            <RegistrationDocuments
              fileType="cargo_photo"
              data={documents.cargoPhoto}
              onChangeDocuments={(files) =>
                handleDocumentsChange("cargoPhoto", files)
              }
            />
          </div>
        </div>

        <div>
          <Label>Extra attachments</Label>
          <RegistrationDocuments
            fileType="extra"
            data={documents.extra}
            onChangeDocuments={(files) =>
              handleDocumentsChange("extra", files)
            }
          />
        </div>

        <Button type="submit" className="w-full" isLoading={loading}>
          {isPending ? "Submitting..." : "Continue"}
        </Button>
      </form>
    </main>
  );
}