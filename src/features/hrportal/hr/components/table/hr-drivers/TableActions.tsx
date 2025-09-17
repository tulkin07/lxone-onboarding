import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Select"
import { CREATE_USER_ROLES } from "@/constants/constants"
import { Link } from "lucide-react"
import { useState } from "react"
import { DrawerAddHr } from "../../DrawerAddHr"
export default function TableActions() {
  const [openModal, setOpenModal] = useState(false)
  return (
    <>
      <div className="flex w-full items-center justify-between pb-4">
        <div className="flex w-full items-center gap-3">
          <div style={{ width: "200px" }}>
            <Input placeholder="Search..." className="text-sm" type="search" />
          </div>
          <div style={{ width: "200px" }}>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Status... " />
              </SelectTrigger>
              <SelectContent>
                {CREATE_USER_ROLES.map((role) => (
                  <SelectItem key={role.value} value={role.value}>
                    {role.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button className="flex items-center gap-1 text-sm font-normal">
            <Link size={16} />
            <span className="pl-1">Invite Link</span>
          </Button>
          <Button
            className="text-sm font-normal"
            onClick={() => setOpenModal(true)}
          >
            Add Request
          </Button>
        </div>
      </div>
      <DrawerAddHr open={openModal} closeDrawer={() => setOpenModal(false)} />
    </>
  )
}
