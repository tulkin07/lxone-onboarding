"use client"

import { VehicleInfo } from "@/features/dispatch/types"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import Spinner from "@/components/Spinner"

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false })

type Props = {
  vehicleInfo: VehicleInfo
  backendContent: string
  isLoadingDispatchVehicle: boolean
  setVehicleInfo: (a: VehicleInfo) => void
  setJoditEditor: (a: string) => void
}

export default function JoditEditorWrapper({
  vehicleInfo,
  backendContent,
  isLoadingDispatchVehicle,
  setVehicleInfo,
  setJoditEditor,
}: Props) {
  const [content, setContent] = useState("")

  useEffect(() => {
    if (content) {
      setVehicleInfo({ ...vehicleInfo, message_on_bid: content })
    }
  }, [content])

  const fillTemplateWithData = (html: string, info: VehicleInfo): string => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, "text/html")

    const ids = ["broker_price", "miles", "eta", "dimension", "vehicle_type"]

    ids.forEach((id) => {
      const el = doc.getElementById(id)
      if (el && info[id as keyof VehicleInfo]) {
        el.textContent = info[id as keyof VehicleInfo] as string
      }
    })

    return doc.body.innerHTML
  }

  useEffect(() => {
    if (backendContent) {
      const filledContent = fillTemplateWithData(backendContent, vehicleInfo)
      setContent(filledContent)
    }
  }, [backendContent, vehicleInfo])

  return (
    <div className="relative w-full">
      <JoditEditor
        className="rounded-xl"
        value={content}
        config={{
          toolbar: true,
          theme: "default",
          height: 320,
          readonly: false,
          showCharsCounter: false,
          showWordsCounter: false,
          showXPathInStatusbar: false,
          buttons: [
            "paragraph",
            "bold",
            "italic",
            "underline",
            "|",
            "ul",
            "ol",
            "|",
            "outdent",
            "indent",
            "|",
            "font",
            "fontsize",
            "brush",
            "|",
            "align",
            "|",
            "table",
            "hr",
            "|",
            "undo",
            "redo",
          ],
          removeButtons: [
            "source",
            "image",
            "video",
            "file",
            "copyformat",
            "print",
            "about",
            "fullsize",
          ],
        }}
        onBlur={(newContent) => setJoditEditor(newContent)}
      />

      {isLoadingDispatchVehicle && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60 dark:bg-black/50">
          <div className="flex h-5 items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
          </div>
        </div>
      )}
    </div>
  )
}
