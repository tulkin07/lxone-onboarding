"use client"

import { Divider } from "@/components/Divider"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarLink,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarSubLink,
} from "@/components/Sidebar"
import { cx, focusRing } from "@/lib/utils"
import { RiArrowDownSFill } from "@remixicon/react"
import {
  FileInput,
  Users,
  Truck,
  Ticket,
  Car,
  Home,
} from "lucide-react"
import * as React from "react"
import { Logo } from "../../../../public/Logo"
import { UserProfile } from "./UserProfile"
import { usePathname, useRouter } from "next/navigation"

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
    children: [],
  },
  {
    name: "Dispatch",
    href: "/dashboard/dispatch",
    icon: Truck,
    children: [],
  },
  {
    name: "Bids",
    href: "/dashboard/driver-bids",
    icon: Ticket,
    children: [],
  },
  {
    name: "Loads",
    href: "/dashboard/loads",
    icon: FileInput,
    children: [
      { name: "Confirmed Loads", href: "/dashboard/loads" },
      { name: "Orders", href: "/dashboard/loads/orders" },
    ],
  },
  {
    name: "HR Portal",
    href: "/dashboard/hr",
    icon: Users,
    children: [
      { name: "HR Portal", href: "/dashboard/hr" },
      { name: "HR Vehicles", href: "/dashboard/hr/hr-vehicles" },
    ],
  },
  {
    name: "Vehicles",
    href: "/dashboard/vehicles",
    icon: Car,
    children: [],
  },
] as const

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const router = useRouter()
  const [openMenus, setOpenMenus] = React.useState<string[]>([])

  const toggleMenu = (name: string) => {
    setOpenMenus((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name],
    )
  }

  return (
    <Sidebar {...props} className="bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <SidebarHeader className="px-3 py-[15px]">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-md bg-white p-1.5 shadow-sm ring-1 ring-gray-200 dark:bg-gray-900 dark:ring-gray-800">
            <Logo className="size-6 text-blue-500 dark:text-blue-500" />
          </span>
          <div>
            <span className="block text-sm font-semibold text-gray-900 dark:text-gray-50">
              Logistix One
            </span>
            <span className="block text-xs text-gray-900 dark:text-gray-50">
              Dispatch company
            </span>
          </div>
        </div>
      </SidebarHeader>
        <div className="px-3">
        <Divider className="my-0 py-0" />
       </div>

      {/* Content */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                const hasChildren = item.children.length > 0

                return (
                  <SidebarMenuItem key={item.name}>
                    {hasChildren ? (
                      <>
                        <button
                          onClick={() => toggleMenu(item.name)}
                          className={cx(
                            "flex w-full items-center justify-between gap-x-2.5 rounded-md p-2 text-base text-gray-900 transition hover:bg-gray-200/50 sm:text-sm dark:text-gray-400 hover:dark:bg-gray-900 hover:dark:text-gray-50",
                            focusRing,
                          )}
                        >
                          <div className="flex items-center gap-2.5">
                            <item.icon className="size-[18px] shrink-0" />
                            {item.name}
                          </div>
                          <RiArrowDownSFill
                            className={cx(
                              openMenus.includes(item.name)
                                ? "rotate-0"
                                : "-rotate-90",
                              "size-5 shrink-0 transform text-gray-400 transition-transform duration-150 ease-in-out dark:text-gray-600",
                            )}
                          />
                        </button>
                        {openMenus.includes(item.name) && (
                          <SidebarMenuSub>
                            <div className="absolute inset-y-0 left-4 w-px bg-gray-300 dark:bg-gray-800" />
                            {item.children.map((child) => {
                              const isChildActive = pathname === child.href
                              return (
                                <SidebarMenuItem key={child.name}>
                                  <SidebarSubLink
                                    href={child.href}
                                    isActive={isChildActive}
                                  >
                                    {child.name}
                                  </SidebarSubLink>
                                </SidebarMenuItem>
                              )
                            })}
                          </SidebarMenuSub>
                        )}
                      </>
                    ) : (
                      <SidebarLink
                        href={item.href}
                        isActive={isActive}
                        icon={item.icon}
                      >
                        {item.name}
                      </SidebarLink>
                    )}
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <div className="border-t border-gray-200 dark:border-gray-800" />
        <UserProfile />
      </SidebarFooter>
    </Sidebar>
  )
}



// "use client"

// import { Divider } from "@/components/Divider"
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuItem,
// } from "@/components/Sidebar"
// import { cx, focusRing } from "@/lib/utils"
// import { RiArrowDownSFill } from "@remixicon/react"
// import {
//   FileInput,
//   Users,
//   Truck,
//   Ticket,
//   Wallet,
//   Car,
//   Home,
// } from "lucide-react"
// import * as React from "react"
// import { Logo } from "../../../../public/Logo"
// import { UserProfile } from "./UserProfile"
// import { useRouter, usePathname } from "next/navigation"

// interface NavigationChild {
//   name: string
//   href: string
// }

// interface NavigationItem {
//   name: string
//   href: string
//   icon?: React.ComponentType<any>
//   children: NavigationChild[]
// }

// const navigation2: NavigationItem[] = [
//   {
//     name: "Dashboard",
//     href: "/dashboard",
//     icon: Home,
//     children: [],
//   },
//   {
//     name: "Dispatch",
//     href: "/dashboard/dispatch",
//     icon: Truck,
//     children: [],
//   },
//   {
//     name: "Bids",
//     href: "/dashboard/driver-bids",
//     icon: Ticket,
//     children: [],
//   },
//   {
//     name: "Loads",
//     href: "/dashboard/loads",
//     icon: FileInput,
//     children: [
//       { name: "Confirmed Loads", href: "/dashboard/loads" },
//       { name: "Orders", href: "/dashboard/loads/orders" },
//     ],
//   },
//   // {
//   //   name: "Accounting",
//   //   href: "/dashboard/accounting",
//   //   icon: Wallet,
//   //   children: [],
//   // },
//   {
//     name: "HR Portal",
//     href: "/dashboard/hr",
//     icon: Users,
//     children: [
//       { name: "HR Portal", href: "/dashboard/hr" },
//       { name: "HR Vehicles", href: "/dashboard/hr/hr-vehicles" },
//     ],
//   },
//   {
//     name: "Vehicles",
//     href: "/dashboard/vehicles",
//     icon: Car,
//     children: [
//       // { name: "Vehicles", href: "/dashboard/vehicles" },
//       // { name: "Mailing", href: "/dashboard/vehicles/mailing" },
//     ],
//   },
//   // {
//   //   name: "Invites",
//   //   href: "/dashboard/invites",
//   //   icon: UserPlus,
//   //   children: [],
//   // },
//   // {
//   //   name: "Settings",
//   //   href: "/dashboard/settings",
//   //   icon: Settings,
//   //   children: [],
//   // },
// ]

// export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
//   const router = useRouter()
//   const pathname = usePathname()
//   const [openMenus, setOpenMenus] = React.useState<string[]>([])

//   const toggleMenu = (item: NavigationItem) => {
//     const hasChildren = item.children.length > 0

//     if (hasChildren) {
//       setOpenMenus((prev) =>
//         prev.includes(item.name)
//           ? prev.filter((name) => name !== item.name)
//           : [...prev, item.name],
//       )
//     }

//     router.push(item.href)
//   }

//   const handleChildClick = (href: string) => {
//     router.push(href)
//   }

//   const renderSidebarItems = (items: NavigationItem[]): React.ReactNode => {
//     return items.map((item) => {
//       const isActive = pathname === item.href
//       const hasChildren = item.children.length > 0
//       const isOpen = openMenus.includes(item.name)

//       return (
//         <SidebarMenuItem key={item.name}>
//           <div className="flex flex-col">
//             <button
//               onClick={() => toggleMenu(item)}
//               className={cx(
//                 "flex w-full items-center justify-between gap-x-2.5 rounded-md p-2 text-base transition sm:text-sm",
//                 focusRing,
//                 "hover:bg-gray-200/50 hover:text-gray-900 dark:hover:bg-gray-900 dark:hover:text-gray-50",
//                 isActive
//                   ? "bg-gray-200/60 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
//                   : "text-gray-900 dark:text-gray-400",
//               )}
//             >
//               <div className="flex items-center gap-2.5">
//                 {item.icon && <item.icon className="size-[18px] shrink-0" />}
//                 {item.name}
//               </div>
//               {hasChildren && (
//                 <RiArrowDownSFill
//                   className={cx(
//                     isOpen ? "rotate-0" : "-rotate-90",
//                     "size-5 shrink-0 transform text-gray-400 transition-transform duration-150 ease-in-out dark:text-gray-600",
//                   )}
//                 />
//               )}
//             </button>

//             {/* Child menu */}
//             {hasChildren && isOpen && (
//               <div className="ml-6 mt-1 space-y-1">
//                 {item.children.map((child) => {
//                   const isChildActive = pathname === child.href
//                   return (
//                     <button
//                       key={child.name}
//                       onClick={() => handleChildClick(child.href)}
//                       className={cx(
//                         "block w-full rounded-md p-2 text-left text-sm transition",
//                         "hover:bg-gray-200/50 hover:text-gray-900 dark:hover:bg-gray-900 dark:hover:text-gray-50",
//                         isChildActive
//                           ? "bg-gray-200/60 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
//                           : "text-gray-700 dark:text-gray-400",
//                       )}
//                     >
//                       {child.name}
//                     </button>
//                   )
//                 })}
//               </div>
//             )}
//           </div>
//         </SidebarMenuItem>
//       )
//     })
//   }

//   return (
//     <Sidebar {...props} className="bg-gray-50 dark:bg-gray-950">
//       {/* Header */}
//       <SidebarHeader className="px-3 py-[15px]">
//         <div className="flex items-center gap-3">
//           <span className="flex size-9 items-center justify-center rounded-md bg-white p-1.5 shadow-sm ring-1 ring-gray-200 dark:bg-gray-900 dark:ring-gray-800">
//             <Logo className="size-6 text-blue-500 dark:text-blue-500" />
//           </span>
//           <div>
//             <span className="block text-sm font-semibold text-gray-900 dark:text-gray-50">
//               Logistix One
//             </span>
//             <span className="block text-xs text-gray-900 dark:text-gray-50">
//               Dispatch company
//             </span>
//           </div>
//         </div>
//       </SidebarHeader>

//       <div className="px-3">
//         <Divider className="my-0 py-0" />
//       </div>

//       {/* Sidebar menu */}
//       <SidebarContent>
//         <SidebarGroup>
//           <SidebarGroupContent>
//             <SidebarMenu className="space-y-1">
//               {renderSidebarItems(navigation2)}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>

//       {/* Footer */}
//       <SidebarFooter>
//         <div className="border-t border-gray-200 dark:border-gray-800" />
//         <UserProfile />
//       </SidebarFooter>
//     </Sidebar>
//   )
// }
