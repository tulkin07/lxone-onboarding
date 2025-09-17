import React, { useState } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/Accordion"
import { Download, Edit } from "lucide-react"
import { DrawerEditHr } from "./DrawerEditHr"
import Link from "next/link"
import AnimatePulse from "@/components/AnimatePulse"
export default function HrPortalInfo({
  data,
  isLoading,
}: {
  data: any
  isLoading: boolean,
}) {
  const [openModal, setOpenModal] = useState(false)
  return (
    <>
      <Accordion
        type="single"
        className="mx-auto mt-3 max-w-sm"
        collapsible
        defaultValue="item-1"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <span>Company Info </span>
              <Edit
                size={18}
                className="text-blue-400"
                onClick={(e) => {
                  e.stopPropagation()
                  setOpenModal(true)
                }}
              />
            </div>
          </AccordionTrigger>
          <AccordionContent>
            {isLoading ? (
              <AnimatePulse row={13} col={1}/>
            ) : (
              <div className="flex flex-col gap-2">
                <div>
                  <p className="text-xs font-light dark:text-gray-500">Full Company Name</p>
                  <h4 className="text-sm font-medium dark:text-gray-400">
                    {data?.company_name || "-"}
                  </h4>
                </div>
                <div>
                  <p className="text-xs font-light dark:text-gray-500">Owner</p>
                  <h4 className="text-sm font-medium dark:text-gray-400">
                    {data?.owner_first_name ||
                      "-" + " " + data?.owner_second_name ||
                      "-"}
                  </h4>
                </div>
                <div>
                  <p className="text-xs font-light dark:text-gray-500">Company Email</p>
                  <h4 className="text-sm font-medium dark:text-gray-400">{data?.email || "-"}</h4>
                </div>
                <div>
                  <p className="text-xs font-light dark:text-gray-500">Company Phone</p>
                  <h4 className="text-sm font-medium dark:text-gray-400">
                    {data?.company_phone || "-"}
                  </h4>
                </div>
                <div>
                  <p className="text-xs font-light dark:text-gray-500">Employer ID</p>
                  <h4 className="text-sm font-medium dark:text-gray-400">
                    {data?.employee_id || "-"}
                  </h4>
                </div>
                <div>
                  <p className="text-xs font-light dark:text-gray-500">Title</p>
                  <h4 className="text-sm font-medium dark:text-gray-400">{data?.title || "-"}</h4>
                </div>
                <div>
                  <p className="text-xs font-light dark:text-gray-500">Company Birth</p>
                  <h4 className="text-sm font-medium dark:text-gray-400">
                    {data?.company_birth_date || "-"}
                  </h4>
                </div>
                <div>
                  <p className="text-xs font-light dark:text-gray-500">City</p>
                  <h4 className="text-sm font-medium dark:text-gray-400">{data?.city || "-"}</h4>
                </div>
                <div>
                  <p className="text-xs font-light dark:text-gray-500">ZIP</p>
                  <h4 className="text-sm font-medium dark:text-gray-400">
                    {data?.zip_code || "-"}
                  </h4>
                </div>
                <div>
                  <p className="text-xs font-light dark:text-gray-500">State</p>
                  <h4 className="text-sm font-medium dark:text-gray-400">{data?.state || "-"}</h4>
                </div>
                <div>
                  <p className="text-xs font-light dark:text-gray-500">Applicant Phone</p>
                  <h4 className="text-sm font-medium dark:text-gray-400">
                    {data?.owner_phone || "-"}
                  </h4>
                </div>
                <div>
                  <p className="text-xs font-light dark:text-gray-500">Emergency Phone</p>
                  <h4 className="text-sm font-medium dark:text-gray-400">
                    {data?.emergency_phone_number || "-"}
                  </h4>
                </div>
                <div>
                  <p className="text-xs font-light dark:text-gray-500">Address Line</p>
                  <h4 className="text-sm font-medium dark:text-gray-400">{data?.address}</h4>
                </div>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            <span>Download Files</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-2">
              <Link
                href={data?.link_signature || "#"}
                target="_blank"
                className="flex items-center text-xs"
              >
                <span className="flex border-b font-thin">Signature Link</span>
              </Link>
              <Link
                href={data?.w9 || "#"}
                target="_blank"
                className="flex items-center gap-1 text-xs"
              >
                <span className="flex border-b font-thin">FW9 Contract</span>
                <Download size={13} className="text-blue-500" />
              </Link>
              <Link
                href={data?.w9 || "#"}
                target="_blank"
                className="flex items-center gap-1 text-xs"
              >
                <span className="flex border-b font-thin">
                  EVA AUTO TRANSPORT LLC Contract
                </span>
                <Download size={13} className="text-blue-500" />
              </Link>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            <span>Via email forwarding</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-1">
              <div>
                <p className="text-xs font-light dark:text-gray-500">Company Name</p>
                <h4 className="text-sm font-medium dark:text-gray-400">
                  {data?.deposit_company_name || "-"}
                </h4>
              </div>
              <div>
                <p className="text-xs font-light dark:text-gray-500">City, State And Zip Code</p>
                <h4 className="text-sm font-medium dark:text-gray-400">
                  {data?.city_state_zip || "-"}
                </h4>
              </div>
              <div>
                <p className="text-xs font-light dark:text-gray-500">Street Address</p>
                <h4 className="text-sm font-medium dark:text-gray-400">
                  {data?.street_address || "-"}
                </h4>
              </div>
              <div>
                <p className="text-xs font-light dark:text-gray-500">Bank Name</p>
                <h4 className="text-sm font-medium dark:text-gray-400">
                  {data?.bank_name || "-"}
                </h4>
              </div>
              <div>
                <p className="text-xs font-light dark:text-gray-500">Accounting Number</p>
                <h4 className="text-sm font-medium dark:text-gray-400">
                  {data?.accounting_number || "-"}
                </h4>
              </div>
              <div>
                <p className="text-xs font-light dark:text-gray-500">Routing Number</p>
                <h4 className="text-sm font-medium dark:text-gray-400">
                  {data?.routing_number || "-"}
                </h4>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <DrawerEditHr
        data={data}
        open={openModal}
        closeDrawer={() => setOpenModal(false)}
      />
    </>
  )
}
