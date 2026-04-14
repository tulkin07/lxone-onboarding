"use client"

import { uploadRegistrationDocumentFile } from "@/components/FilePondComponent"
import { Loader2, Trash2 } from "lucide-react"
import React, { useEffect, useRef, useState } from "react"
import SignatureCanvas from "react-signature-canvas"

async function dataUrlToFile(dataUrl: string, filename: string): Promise<File> {
  const res = await fetch(dataUrl)
  const blob = await res.blob()
  return new File([blob], filename, { type: blob.type || "image/png" })
}

const UPLOAD_DEBOUNCE_MS = 600

export default function SignaturePadWithUpload({
  onChange,
}: {
  onChange?: (value: string | null) => void
}) {
  const sigRef = useRef<SignatureCanvas | null>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [])

  const runUpload = async () => {
    const canvas = sigRef.current
    if (!canvas || canvas.isEmpty()) {
      onChange?.(null)
      return
    }
    const dataUrl = canvas.toDataURL("image/png")
    try {
      setUploading(true)
      const file = await dataUrlToFile(
        dataUrl,
        `signature_${Date.now()}.png`,
      )
      const { url } = await uploadRegistrationDocumentFile(file)
      onChange?.(url)
    } catch (e) {
      console.error(e)
      onChange?.(null)
    } finally {
      setUploading(false)
    }
  }

  const handleSignatureEnd = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      void runUpload()
    }, UPLOAD_DEBOUNCE_MS)
  }

  const clearSignature = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    sigRef.current?.clear()
    onChange?.(null)
  }

  return (
    <div className="relative">
      <SignatureCanvas
        ref={sigRef}
        canvasProps={{
          className: "signature rounded border bg-gray-100 w-full h-40",
        }}
        onEnd={handleSignatureEnd}
      />

      {uploading && (
        <div className="absolute inset-0 flex items-center justify-center rounded border bg-white/70">
          <Loader2 className="size-8 animate-spin text-blue-500" aria-hidden />
          <span className="sr-only">Uploading signature</span>
        </div>
      )}

      <span
        className="absolute top-2 right-2 cursor-pointer"
        onClick={clearSignature}
      >
        <Trash2 className="text-red-500 hover:opacity-50" />
      </span>
    </div>
  )
}
