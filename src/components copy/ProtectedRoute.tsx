"use client"

import { useContext, useEffect, useState } from "react"
import Spinner from "./Spinner"
import { useUser } from "@/features/auth/hooks/useUser"

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isLoading } = useUser()

  useEffect(() => {
    if (isLoading) return

    if (!user) {
      window.location.href = "/auth/login"
      return
    }

    const company = localStorage.getItem("selected-company-id")
    if (!company) {
      window.location.href = "/company-selection"
    }
  }, [user, isLoading])

  if (isLoading) {
    return <Spinner />
  }

  return <>{children}</>
}

// "use client"

// import { useContext, useEffect, useState } from "react"
// import { useAuth } from "@/context/auth/userContext"
// import { useRouter } from "next/navigation"
// import Spinner from "./Spinner"

// export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
//   const { user, isLoading } = useAuth()
//   const router = useRouter()
//   const [isChecking, setIsChecking] = useState(true) // Yangi flag

//   // useEffect(() => {
//   //     console.log("test1")
//   //   if (!isLoading) {
//   //     if (!user) {
//   //       localStorage.clear()
//   //       router.push("/auth/login")
//   //     } else if (user.companies?.length === 0) {
//   //       console.log("test2")
//   //       router.push("/onboarding/company")
//   //     } else {
//   //       setIsChecking(false) // User to'g'ri => renderga ruxsat
//   //     }
//   //   }
//   // }, [user, isLoading, router])

//   if (isLoading ) {
//     return <Spinner />
//   }

//   return <>{children}</>
// }
