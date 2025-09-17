export type Usage = {
  id: string
  make: string
  model: string
  main_driver: {
    full_name: string
  } | null
  vehicle_vin: string
  status: string
}
