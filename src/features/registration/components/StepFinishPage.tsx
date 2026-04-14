"use client";

import { Button } from "@/components/Button";
import { Label } from "@/components/Label";
import SignaturePadWithUpload from "@/components/SignaturePadWithUpload";
import { CompanyInfoProvider } from "@/context/CompanyInfoContext";
import React, { useState } from "react";
import { useCreateSignatureFiles } from "../hooks/useCreateSignatureFiles";

export default function StepFinishPage() {
  const { mutate, isPending } = useCreateSignatureFiles();

  const [signature, setSignature] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!signature) return;

    mutate({
      contract_signature: signature,
    });
  };

  return (
    <CompanyInfoProvider>
      <div className="w-full">
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">

          <div>
            <Label required className="mb-1 block text-sm font-medium text-gray-700">
              Read the documents and sign
            </Label>

            <SignaturePadWithUpload onChange={setSignature} />
          </div>

          <Button
            className="mt-4 w-full disabled:bg-gray-200 disabled:text-gray-500"
            type="submit"
            disabled={!signature || isPending}
            isLoading={isPending}
            loadingText="Submitting..."
          >
            Continue
          </Button>

        </form>
      </div>
    </CompanyInfoProvider>
  );
}