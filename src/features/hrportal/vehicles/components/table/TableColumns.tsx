import { Badge } from "@/components/Badge"
import { Button } from "@/components/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/DropdownMenu"
import { DRIVER_STATUS_STYLES, TRUCK_TYPES, VEHICLE_STATUS_STYLES } from "@/constants/constants"
import { RiMore2Fill } from "@remixicon/react"
import { Pen } from "lucide-react"

export const columnsWithActions = (onEdit?: (row: any) => void) => [
  {
    accessorKey: "id",
    header: "#",
    // cell: (info: any) => info.row.index + 1,
  },
  {
    accessorKey: "driver",
    header: "Driver",
    cell: ({ row }: any) => {
      return <span>{row?.original?.main_driver?.full_name}</span>
    },
  },
  {
    accessorKey: "truck_type",
    header: "Vehicle",
    cell: ({ row }: any) => {
      const found = TRUCK_TYPES.find(
        (item) => item.value === row?.original?.truck_type,
      )
      return found ? found.label : "..."
    },
  },
  {
    accessorKey: "size",
    header: "Registration Exp",
  },
  {
    accessorKey: "insurance_expire_date",
    header: "Insurance Exp ",
  },
  {
    accessorKey: "license_expire_date", 
    header: "License Exp",
  },
  {
    id: "actions",
    header: "Docs",
     cell: ({ row }: any) => (
      <div>
        <Badge>
          {row?.original?.document_count +
            "/" +
            row?.original?.total_doc_numbers}
        </Badge>
      </div>
    ),
  },
  {
    id: "status",
    header: "Status",
     cell: ({ row }: any) => {
      const status = row.original?.status
      const statusStyle = DRIVER_STATUS_STYLES[status]
      if (!statusStyle) {
        return <span style={{ color: "#6B7280" }}>Unknown</span>
      }

      const { label, color, bg } = statusStyle
      return (
        <span
          style={{
            backgroundColor: bg,
            color,
            padding: "4px 8px",
            borderRadius: "10px",
            fontWeight: "500",
            fontSize: "14px",
          }}
        >
          {label}
        </span>
      )
    },
  },
]
