import Link from "next/link"
import React from "react"

export default function Footer() {
  return (
    <div className="text-center py-8 text-gray-500 font-medium text-sm xs:text-xs px-3">
      <div>Powered by: <span className="text-base text-red-500 font-bold ">Lx1</span></div>
      <div>© 2025 All Rights Reserved. Eva Auto Transport LLC</div>
      <div>
        <Link href={"#"} className="text-blue-500">Privacy Policy.</Link>
      </div>
      <div>
        Eva Auto Transport LLC, 7280 N.W. 87th Terrace, Suite C-210 Kansas City,
        MO 64153
      </div>
      <div>+13613177773 info@evaautotrans.com</div>
    </div>
  )
}
