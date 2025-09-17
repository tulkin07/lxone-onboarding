"use client"

import { Button } from "@/components/Button"
import { cx, focusRing } from "@/lib/utils"
import { ChevronsUpDown } from "lucide-react"

import { DropdownUserProfile } from "./DropdownUserProfile"
import { useEffect, useState } from "react"
import { useAuth } from "@/context/auth/userContext"
import { useUser } from "@/features/auth/hooks/useUser"
export interface ICompany {
  id: number
  name: string
  role: string
}
export type ProfileResponse = {
  phone_number?: string
  gmail: string
  full_name?: string
  user_type: string
  longitude?: string
  latitude?: string
  is_signed_document: boolean
  stripe_report_id?: string
  stripe_first_name?: string
  stripe_last_name?: string
  stripe_document_type?: string
  stripe_json?: string
  location_updated_at?: string
  code_created: string
  trail_started?: string
  trail_finished?: string
  deleted_at?: string
  id: number
  companies: ICompany[]
}
export function UserProfile() {
  const { user } = useUser()
  return (
    <DropdownUserProfile>
      <Button
        aria-label="User settings"
        variant="ghost"
        className={cx(
          "group flex w-full items-center justify-between rounded-md px-1 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200/50 data-[state=open]:bg-gray-200/50 hover:dark:bg-gray-800/50 data-[state=open]:dark:bg-gray-900",
          focusRing,
        )}
      >
        <span className="flex items-center gap-3">
          <span
            className="flex size-8 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-white text-xs text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300"
            aria-hidden="true"
          >
            {user?.full_name
              ? user?.full_name?.split(" ").map((item) => item[0])
              : "N/A"}
          </span>
          <span>{user?.full_name ? user?.full_name : "N/A"}</span>
        </span>
        <ChevronsUpDown
          className="size-4 shrink-0 text-gray-500 group-hover:text-gray-700 group-hover:dark:text-gray-400"
          aria-hidden="true"
        />
      </Button>
    </DropdownUserProfile>
  )
}
