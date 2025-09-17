"use client"
import ImageUploader from "@/components/FilePondComponent"
import React, { useState, useEffect, useRef } from "react"

export interface DocumentFile {
  file_type: string
  file: string
}

export default function HrVehicleDocuments({
  data = [],
  onChangeDocuments,
}: {
  data?: DocumentFile[]
  onChangeDocuments?: (docs: DocumentFile[]) => void
}) {
  const [documents, setDocuments] = useState<DocumentFile[]>(data)
  const previousDocumentsRef = useRef<DocumentFile[]>(data)

  useEffect(() => {
    setDocuments(data)
  }, [data])

  useEffect(() => {
    if (
      onChangeDocuments &&
      JSON.stringify(previousDocumentsRef.current) !== JSON.stringify(documents)
    ) {
      onChangeDocuments(documents)
      previousDocumentsRef.current = documents
    }
  }, [documents, onChangeDocuments])

  const handleUpload = (newDocs: DocumentFile[], fileType: string) => {
    setDocuments((prev) => {
      const filtered = prev.filter((doc) => doc.file_type !== fileType)
      return [...filtered, ...newDocs]
    })
  }

  const handleRemove = (fileName: string, fileType: string) => {
    setDocuments((prev) =>
      prev.filter(
        (doc) => !(doc.file === fileName && doc.file_type === fileType),
      ),
    )
  }

  return (
    <div className="space-y-4">
      <div>
        <p className="mb-1 text-sm font-medium">Insurance </p>
        <ImageUploader
          multiSelect
          fileType="1"
          existingLogo={documents.filter((d) => d.file_type === "1")}
          onUpload={(docs) => handleUpload(docs, "1")}
          onRemove={(removedFile) => handleRemove(removedFile, "1")}
        />
      </div>

      <div>
        <p className="mb-1 text-sm font-medium">Vehicle Registration</p>
        <ImageUploader
          multiSelect
          fileType="2"
          existingLogo={documents.filter((d) => d.file_type === "2")}
          onUpload={(docs) => handleUpload(docs, "2")}
          onRemove={(removedFile) => handleRemove(removedFile, "2")}
        />
      </div>

      <div>
        <p className="mb-1 text-sm font-medium">Photo Left Side</p>
        <ImageUploader
          multiSelect
          fileType="3"
          existingLogo={documents.filter((d) => d.file_type === "3")}
          onUpload={(docs) => handleUpload(docs, "3")}
          onRemove={(removedFile) => handleRemove(removedFile, "3")}
        />
      </div>

      <div>
        <p className="mb-1 text-sm font-medium">Photo Right Side</p>
        <ImageUploader
          multiSelect
          fileType="4"
          existingLogo={documents.filter((d) => d.file_type === "4")}
          onUpload={(docs) => handleUpload(docs, "4")}
          onRemove={(removedFile) => handleRemove(removedFile, "4")}
        />
      </div>

      <div>
        <p className="mb-1 text-sm font-medium">Cargo Space Photo</p>
        <ImageUploader
          multiSelect
          fileType="5"
          existingLogo={documents.filter((d) => d.file_type === "5")}
          onUpload={(docs) => handleUpload(docs, "5")}
          onRemove={(removedFile) => handleRemove(removedFile, "5")}
        />
      </div>
    </div>
  )
}
