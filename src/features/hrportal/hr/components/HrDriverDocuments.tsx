"use client"
import ImageUploader from "@/components/FilePondComponent"
import React, { useState, useEffect, useRef } from "react"

export interface DocumentFile {
  file_type: string
  file: string
}

export default function HrDriverDocuments({
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
        <p className="mb-1 text-sm font-medium">Driver license  </p>
        <ImageUploader
          multiSelect
          fileType="1"
          existingLogo={documents.filter((d) => d.file_type === "1")}
          onUpload={(docs) => handleUpload(docs, "1")}
          onRemove={(removedFile) => handleRemove(removedFile, "1")}
        />
      </div>

     
      <div>
        <p className="mb-1 text-sm font-medium">Driving Record</p>
        <ImageUploader
          multiSelect
          fileType="2"
          existingLogo={documents.filter((d) => d.file_type === "2")}
          onUpload={(docs) => handleUpload(docs, "2")}
          onRemove={(removedFile) => handleRemove(removedFile, "2")}
        />
      </div>

     
      <div>
        <p className="mb-1 text-sm font-medium">Green card or Passport</p>
        <ImageUploader
          multiSelect
          fileType="3"
          existingLogo={documents.filter((d) => d.file_type === "3")}
          onUpload={(docs) => handleUpload(docs, "3")}
          onRemove={(removedFile) => handleRemove(removedFile, "3")}
        />
      </div>
    </div>
  )
}
