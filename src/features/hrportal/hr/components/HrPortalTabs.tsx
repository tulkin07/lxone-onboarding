"use client"

import React, { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/Tabs"
import { Button } from "@/components/Button"
import HrDriversTable from "./table/hr-drivers/HrDriversTable"
import HrVehiclesTable from "./table/hr-vehicles/HrVehiclesTable"
import { DrawerAddHrDriver } from "./DrawerAddHrDriver"
import { DrawerAddHrVehicles } from "./DrawerAddHrVehicles"
import { DrawerEditHrDriver } from "./DrawerEditHrDriver "
import { useHrVehiclesList } from "../hooks/useHrVehiclesList "
import { useHrDriversList } from "../hooks/useHrDriversList"
import { useUpdateHrVehicleStatus } from "../hooks/useUpdateHrVehicleStatus"
import { DrawerEditHrVehicle } from "./DrawerEditHrVehicle"
import { DriverDataTable } from "./hr-tabs/driver-data-table/DataTable"
import { columns } from "./hr-tabs/driver-data-table/columns"
import { columns as columnsVehicle } from "./hr-tabs/vehicle-data-table/columns"
import { VehicleDataTable } from "./hr-tabs/vehicle-data-table/DataTable"

export default function HrPortalTabs() {
  const { hrVehicles, isLoading } = useHrVehiclesList()
  const { hrDrivers, isLoadingDriversList } = useHrDriversList()
  const [activeTab, setActiveTab] = React.useState("tab1") // default tab
  const [openDriver, setOpenDriver] = useState(false)
  const [openVehicles, setOpenVehicle] = useState(false)
  const [driverData, setDriverData] = useState<{ id: string } | null>(null)
  const [openDriverModal, setDriverModal] = useState(false)
  const [openVehicleUpdateModal, setOpenVehiclUpdateModal] = useState(false)
  const [vehicleUpdateData, setVehicleUpdateData] = useState<{
    id: string
  } | null>(null)
  const { isPendingStatus, updateHrVehicleStatus } = useUpdateHrVehicleStatus()

  const onEditDriver = (data: any) => {
    setDriverData(data)
    setDriverModal(true)
  }

  const onEditVehicles = (data: any) => {
    setVehicleUpdateData(data)
    setOpenVehiclUpdateModal(true)
  }

  return (
    <>
      <Tabs value={activeTab} onValueChange={setActiveTab} defaultValue="tab1">
        <TabsList
          variant="solid"
          className="flex items-center justify-between bg-none"
        >
          <div>
            <TabsTrigger value="tab1">Drivers</TabsTrigger>
            <TabsTrigger value="tab2">Vehicles</TabsTrigger>
          </div>
          <div>
            {activeTab === "tab1" ? (
              <Button className="py-1" onClick={() => setOpenDriver(true)}>
                Add Driver
              </Button>
            ) : (
              <Button className="py-1" onClick={() => setOpenVehicle(true)}>
                Add Vehicles
              </Button>
            )}
          </div>
        </TabsList>

        <div className="ml-2 mt-4">
          <TabsContent
            value="tab1"
            className="space-y-2 text-sm leading-7 text-gray-600 dark:text-gray-500"
          >
            <DriverDataTable
              isLoading={isLoadingDriversList}
              data={hrDrivers ? hrDrivers?.items : ([] as unknown as any)}
              columns={columns}
            />
            {/* <HrDriversTable
              pages={hrDrivers ? hrDrivers?.pages : 1}
              total={hrDrivers ? hrDrivers?.total : 10}
              data={hrDrivers ? hrDrivers.items : []}
              isLoading={isLoadingDriversList}
              onEdit={(data) => onEditDriver(data)}
            /> */}
          </TabsContent>
          <TabsContent
            value="tab2"
            className="space-y-2 text-sm leading-7 text-gray-600 dark:text-gray-500"
          >
            <VehicleDataTable
              isLoading={isLoading}
              data={hrVehicles ? hrVehicles?.items : ([] as unknown as any)}
              columns={columnsVehicle}
            />
            {/* <HrVehiclesTable
              pages={hrVehicles ? hrVehicles?.pages : 1}
              total={hrVehicles ? hrVehicles?.total : 10}
              isPending={isPendingStatus}
              updateStatus={updateHrVehicleStatus}
              data={hrVehicles ? hrVehicles.items : []}
              isLoading={isLoading}
              onEdit={(data) => onEditVehicles(data)}
            /> */}
          </TabsContent>
        </div>
      </Tabs>

      <DrawerAddHrDriver
        open={openDriver}
        closeDrawer={() => setOpenDriver(false)}
      />
      <DrawerAddHrVehicles
        open={openVehicles}
        closeDrawer={() => setOpenVehicle(false)}
      />
      <DrawerEditHrDriver
        id={driverData && driverData?.id}
        open={openDriverModal}
        closeDrawer={() => setDriverModal(false)}
      />
      <DrawerEditHrVehicle
        id={vehicleUpdateData && vehicleUpdateData?.id}
        open={openVehicleUpdateModal}
        closeDrawer={() => setOpenVehiclUpdateModal(false)}
      />
    </>
  )
}
