"use client";

import ImageUploader from "@/components/FilePondComponent";
import React, { useState, useEffect, useRef } from "react";

export interface DocumentFile {
  file_type: string;
  file: string;
}

export default function RegistrationDocuments({
  data = [],
  onChangeDocuments,
  fileType,
}: {
  data?: DocumentFile[];
  onChangeDocuments?: (docs: DocumentFile[]) => void;
  fileType: string;
}) {
  const [documents, setDocuments] = useState<DocumentFile[]>(data);
  const previousRef = useRef<DocumentFile[]>(data);

  useEffect(() => {
    setDocuments(data);
  }, [data]);

  useEffect(() => {
    if (
      onChangeDocuments &&
      JSON.stringify(previousRef.current) !== JSON.stringify(documents)
    ) {
      onChangeDocuments(documents);
      previousRef.current = documents;
    }
  }, [documents, onChangeDocuments]);

  const handleUpload = (newDocs: DocumentFile[]) => {
    setDocuments((prev) => {
      const filtered = prev.filter((d) => d.file_type !== fileType);
      return [...filtered, ...newDocs];
    });
  };

  const handleRemove = (fileName: string) => {
    setDocuments((prev) =>
      prev.filter((d) => d.file !== fileName)
    );
  };

  return (
    <div className="space-y-4">
      <ImageUploader
        multiSelect
        fileType={fileType}
        existingLogo={documents.filter((d) => d.file_type === fileType)}
        onUpload={(docs: any) => handleUpload(docs)}
        onRemove={(file: any) => handleRemove(file)}
      />
    </div>
  );
}