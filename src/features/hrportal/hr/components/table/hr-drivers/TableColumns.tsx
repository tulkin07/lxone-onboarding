import { Badge } from "@/components/Badge"
import { Button } from "@/components/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/DropdownMenu"
import { DRIVER_STATUS_STYLES } from "@/constants/constants"
import { RiMore2Fill } from "@remixicon/react"
import { ArrowUpDown, Edit, Eye, LockIcon, Pencil, Trash } from "lucide-react"

export const columnsWithActions = (
  onEdit?: (row: any) => void,
  onReset?: (row: any) => void,
) => [
  {
    accessorKey: "id",
    header: "#",
    // cell: (info: any) => info.row.index + 1,
  },
  {
    accessorKey: "full_name",
    header: "Driver",
  },
  {
    accessorKey: "gmail",
    header: "Email	",
  },
  {
    accessorKey: "app",
    header: "App",
  },
  {
    accessorKey: "phone_number",
    header: "Phone",
  },
  {
    accessorKey: "driver_status",
    header: "Status",
    cell: ({ row }: any) => {
      const status = row.original?.driver_status // Get value from the row
      const statusStyle = DRIVER_STATUS_STYLES[status]

      if (!statusStyle) {
        return <span style={{ color: "#6B7280" }}>Unknown</span> // fallback if no match
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
  {
    id: "actions",
    header: "",
    cell: ({ row }: any) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="group size-8 hover:border hover:border-gray-300 hover:bg-gray-50 data-[state=open]:border-gray-300 data-[state=open]:bg-gray-50 hover:dark:border-gray-700 hover:dark:bg-gray-900 data-[state=open]:dark:border-gray-700 data-[state=open]:dark:bg-gray-900"
          >
            <RiMore2Fill
              className="size-4 shrink-0 text-gray-500 group-hover:text-gray-700 group-hover:dark:text-gray-400"
              aria-hidden="true"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-36">
          <DropdownMenuItem
            // disabled={row.role === "admin"}
            onClick={() => onEdit && onEdit(row.original)}
            className="flex items-center gap-2"
          >
            <Eye size={18} className="text-blue-500" />
            <span className="text-base"> Edit</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]
