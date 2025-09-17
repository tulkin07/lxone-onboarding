import { Badge } from "@/components/Badge"
import { Button } from "@/components/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/DropdownMenu"
import { RiMore2Fill } from "@remixicon/react"
import { ArrowUpDown, Edit, Eye, LockIcon, Pencil, Trash } from "lucide-react"
import { Cell } from "recharts"

export const columnsWithActions = (
  onEdit?: (row: any) => void,
  onReset?: (row: any) => void,
) => [
  {
    accessorKey: "id",
    header: "#",
    cell: (info: any) => info.row.index + 1,
  },
  {
    accessorKey: "company_name",
    header: "Company Name	",
  },
  {
    accessorKey: "owner_first_name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "registration_date",
    header: "Reg. Date",
  },
  // {
  //   accessorKey: "status",
  //   header: "Status",
  //   cell: ({ row }: any) => <div>...</div>,
  // },
  {
    accessorKey: "document_count",
    header: "Docs",
    cell: ({ row }: any) => (
      <div>
        <Badge>
          {row?.original?.document_count +
            "/" +
            row?.original?.all_document_count}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "manager",
    header: "Manager",
    cell: ({ row }: any) => <div>{row?.original?.manager?.full_name}</div>,
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
            <span className="text-base"> View</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]
