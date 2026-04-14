import { useCompanyInfo } from "@/context/CompanyInfoContext"
import Link from "next/link"
import React from "react"

export default function Footer() {
  const {companyInfo} = useCompanyInfo()
  return (
    <div className="xs:text-xs mt-12 w-full px-0 py-8 text-center text-sm font-medium text-gray-500">
      <div>
        Powered by:{" "}
        <span className="text-base font-bold ">LogistixOne TMS</span>
      </div>
      <div>© 2025 All Rights Reserved. {companyInfo?.company_name}</div>
      <div>
        <Link href={"https://www.logistix.one/privacy-policy"} target="_blank" className="text-blue-500">
          Privacy Policy.
        </Link>
      </div>
      <div>
        {companyInfo?.address}
      </div>
      <div>{companyInfo?.phone_number||"..."} {companyInfo?.email||"..."}</div>
    </div>
  )
}
