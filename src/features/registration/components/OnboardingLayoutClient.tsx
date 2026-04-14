"use client"
import { Logo } from "@/components/ui/Logo"
import { useCompanyInfo } from "@/context/CompanyInfoContext"
import Footer from "@/features/registration/components/Footer"
import useScroll from "@/lib/useScroll"
import { cx } from "@/lib/utils"
import { Mail, Phone } from "lucide-react"
import { usePathname } from "next/navigation"
import React from "react"

interface Step {
  name: string
  href: string
}

const steps: Step[] = [
  { name: "Product selection", href: "/step-one" },
  { name: "Employees", href: "/step-two" },
  { name: "Infrastructure", href: "/step-three" },
  { name: "Infrastructuredwd", href: "/step-finish" },
]

interface StepProgressProps {
  steps: Step[]
}

const StepProgress = ({ steps }: StepProgressProps) => {
  const pathname = usePathname()
  const currentStepIndex = steps.findIndex((step) =>
    pathname.startsWith(step.href),
  )

  return (
    <div aria-label="Onboarding progress">
      <ol className="mx-auto flex w-24 flex-nowrap gap-1 md:w-fit">
        {steps.map((step, index) => (
          <li
            key={step.name}
            style={{ height: "2px" }}
            className={cx(
              " w-12 rounded-full",
              index <= currentStepIndex
                ? "bg-blue-500"
                : "bg-gray-300 dark:bg-gray-700",
            )}
          >
            <span className="sr-only">
              {step.name}{" "}
              {index < currentStepIndex
                ? "completed"
                : index === currentStepIndex
                  ? "current"
                  : ""}
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const scrolled = useScroll(15)
  const { companyInfo } = useCompanyInfo()
  const cleanPhoneNumber = (phone?: string) => {
    if (!phone) return "";
    return phone.replace(/[^0-9+]/g, "");
  };

  return (
    <>
      <header
        className={cx(
          "py-2 fixed inset-x-0 top-0 isolate z-50 flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 transition-all md:grid md:grid-cols-[200px_auto_200px] md:px-6 dark:border-gray-900 dark:bg-gray-925",
          // scrolled ? "h-12" : "h-20",
        )}
      >
        <div
          className="hidden flex-nowrap items-center gap-0.5 md:flex"
          aria-hidden="true"
        >
          <Logo
            className="w-7 p-px text-blue-500 dark:text-blue-500"
          // aria-hidden="true"
          />
          <span className="mt-0.5 text-lg font-semibold text-gray-900 dark:text-gray-50">
            LogistixOne
          </span>
        </div>
        <StepProgress steps={steps} />
        <div className="flex items-center gap-3 justify-end">

          {/* EMAIL */}
          <a
            href={`mailto:${companyInfo?.email || ""}`}
            className="group flex h-8 w-8 items-center justify-center rounded-full border border-blue-500 bg-white shadow-sm transition-all duration-300 hover:scale-110 hover:bg-blue-50 dark:bg-gray-800"
          >
            <Mail
              size={18}
              className="text-blue-500 transition group-hover:scale-110"
            />
          </a>

          {/* PHONE */}
          <a
            href={`tel:${cleanPhoneNumber(companyInfo?.phone_number)}`}
            className="group flex h-8 w-8 items-center justify-center rounded-full border border-green-500 bg-white shadow-sm transition hover:scale-110 hover:bg-green-50 dark:bg-gray-800"
          >
            <Phone size={18} className="text-green-500" />
          </a>

        </div>
      </header>
      <main
        id="main-content"
        className="mx-auto flex min-h-0 w-full max-w-5xl flex-col px-4 pb-16 pt-20 md:px-6"
      >
        {/* <QueryProvider> */}
        {children}
        <>
          {/* <CompanyInfoProvider> */}
          <Footer />
          {/* </CompanyInfoProvider> */}
        </>
        {/* </QueryProvider> */}


      </main>
    </>
  )
}

export default Layout
