import React from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/Accordion"
import { Badge } from "@/components/Badge"
import { ArrowRightIcon } from "lucide-react"
export default function HrHistory() {
  return (
    <Accordion type="single" className="w-full" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>History Of Changes</AccordionTrigger>
        <AccordionContent>
          <Badge className="w-full px-3 py-3" variant="neutral">
            <div>
              <h3 className="text-base font-normal">
                Updated By admin at 07/19/2025 14:25
              </h3>
              <div className="mt-2">
                <div className="flex items-center gap-1 text-xs">
                  Is New: <ArrowRightIcon size={12} />{" "}
                </div>
                <div className="flex items-center gap-1 text-xs">
                  History User: <ArrowRightIcon size={12} />
                </div>
              </div>
            </div>
          </Badge>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
