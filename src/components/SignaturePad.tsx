"use client";

import { Trash2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";

export default function SignaturePad({
  onChange,
}: {
  onChange?: (value: string | null) => void;
}) {
  const sigRef = useRef<SignatureCanvas | null>(null);
  const [signature, setSignature] = useState<string | null>(null);

  const handleSignatureEnd = () => {
    if (sigRef.current) {
      const value = sigRef.current.toDataURL();
      setSignature(value);
      onChange?.(value);
    }
  };

  const clearSignature = () => {
    sigRef.current?.clear();
    setSignature(null);
    onChange?.(null);
  };

  useEffect(() => {
    onChange?.(signature);
  }, [signature]);

  return (
    <div className="relative">
      <SignatureCanvas
        ref={sigRef}
        canvasProps={{
          className: "signature rounded border bg-gray-100 w-full h-40",
        }}
        onEnd={handleSignatureEnd}
      />

      <span
        className="absolute top-2 right-2 cursor-pointer"
        onClick={clearSignature}
      >
        <Trash2 className="text-red-500 hover:opacity-50" />
      </span>
    </div>
  );
}