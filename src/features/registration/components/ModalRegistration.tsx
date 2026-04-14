"use client"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/Dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { Button } from "@/components/Button"

export type ModalAddUserProps = {
  children: React.ReactNode
}

export function ModalRegistration({ children }: ModalAddUserProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div onClick={() => setOpen(true)}>{children}</div>
      </DialogTrigger>

      <DialogContent className="flex max-h-[min(85dvh,720px)] w-[calc(100vw-1.25rem)] flex-col gap-0 overflow-hidden p-0 sm:max-w-2xl sm:p-0">
        {/* Accessibility uchun title */}
        <DialogTitle>
          <VisuallyHidden>Contract Requirements</VisuallyHidden>
        </DialogTitle>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-6 sm:py-6">
          <h2 className="mb-3 text-base font-bold leading-snug text-gray-900 dark:text-gray-50 sm:mb-4 sm:text-lg md:text-xl">
            To finish the contract request make sure you have following documents.
          </h2>

          <ul className="ml-2 list-disc space-y-2 pl-2 text-sm font-medium leading-relaxed text-gray-800 dark:text-gray-200 sm:space-y-3 sm:text-base">
            <li>Driving license</li>
            <li>Vehicle registration</li>
            <li>Voided check</li>
            <li>Driving record</li>
            <li>D3 pictures of your truck</li>
            <li>Insurance certificate</li>
          </ul>

          <h3 className="mb-2 mt-5 text-base font-bold leading-snug text-gray-900 dark:text-gray-50 sm:mt-6 sm:text-lg md:text-xl">
            Insurance requirements
          </h3>

          <ul className="ml-2 list-disc space-y-2 pl-2 text-sm font-medium leading-relaxed text-gray-800 dark:text-gray-200 sm:space-y-3 sm:text-base">
            <li>$1,000,000 Primary Liability Commercial Auto CSL</li>
            <li>$100,000 Broad Form Cargo with $1,000 deductible max.</li>
            <li>Unlimited Radius of Operations</li>
            <li>
              Certificates must also show listed Vehicles (Year, Make, VIN#) as
              well as all listed drivers.
            </li>
            <li>
              Shall be listed as additional insured and certificate holder
            </li>
          </ul>
        </div>

        <div className="shrink-0 border-t border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-[#090E1A] sm:px-6 sm:py-4">
          <DialogClose asChild>
            <Button variant="destructive" className="w-full px-6 sm:px-8">
              Close
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}
