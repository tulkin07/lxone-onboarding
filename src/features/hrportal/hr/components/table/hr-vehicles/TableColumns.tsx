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
import { Check, Eye, Pen, X } from "lucide-react"

export const columnsWithActions = (
  isPending: boolean,
  updateStatus: (d: { status: string; id: string }) => void,
  onEdit: (data: any) => void,
) => [
  {
    accessorKey: "id",
    header: "Id",
    cell: (info: any) => info.row.index + 1,
  },
  {
    accessorKey: "make",
    header: "Make",
  },
  {
    accessorKey: "model",
    header: "Model",
  },
  {
    accessorKey: "driver",
    header: "Driver",
    cell:({row}:any)=>{
      return  row?.original?.main_driver?.full_name
    }
  },
  {
    accessorKey: "vehicle_vin",
    header: "VIN",
  },
  {
    accessorKey: "status",
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
            onClick={(e) => {
              e.stopPropagation()
              onEdit(row.original)
            }}
            className="flex items-center gap-2"
          >
            <Pen size={18} className="text-blue-500" />
            <span className="text-base"> Edit</span>
          </DropdownMenuItem>
          {row.original?.status != "accepted" && (
            <DropdownMenuItem
              disabled={isPending}
              onClick={(e) => {
                e.stopPropagation()
                updateStatus({ id: row.original?.id, status: "accepted" })
              }}
              className="flex items-center gap-2"
            >
              <Check size={18} className="text-green-600" />
              <span className="text-base">
                {isPending ? "Loading..." : "Accept"}
              </span>
            </DropdownMenuItem>
          )}

          {row.original?.status != "rejected" && (
            <DropdownMenuItem
              disabled={isPending}
              onClick={(e) => {
                e.stopPropagation()
                updateStatus({ id: row.original?.id, status: "rejected" })
              }}
              className="flex items-center gap-2"
            >
              <X size={18} className="text-red-500" />
              <span className="text-base">
                {isPending ? "Loading..." : "Reject"}
              </span>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]
