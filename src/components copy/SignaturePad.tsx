"use client"

import { Trash2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react"
import SignatureCanvas from "react-signature-canvas"

export default function SignaturePad() {
  const sigRef = useRef<SignatureCanvas | null>(null);

  const [signature, setSignature] = useState<string | null>(null);

  const handleSignatureEnd = () => {
    if (sigRef.current) {
      setSignature(sigRef.current.toDataURL());
    }
  };

  const clearSignature = () => {
    sigRef.current?.clear();
    setSignature(null); 
  };

  useEffect(() => {
    console.log(signature);
  }, [signature]);

  return (
    <div className="relative">
      <SignatureCanvas
        canvasProps={{ className: "signature rounded border bg-gray-100" }}
        ref={sigRef}
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
