

export const API_BASE_URL = "https://api.logistix.one/api"


// export const TRUCK_TYPES = [
//   { label: "LARGE STRAIGHT", value: "LARGE STRAIGHT" },
//   { label: "SPRINTER VAN", value: "SPRINTER VAN" },
//   { label: "SMALL STRAIGHT", value: "SMALL STRAIGHT" },
//   { label: "FLATBED", value: "FLATBED" },
//   { label: "TRACTOR", value: "TRACTOR" },
//   { label: "VAN", value: "VAN" },
//   { label: "DRY VAN", value: "DRY VAN" },
//   { label: "REEFER", value: "REEFER" },
//   { label: "CARGO", value: "CARGO" },
// ] 
export const TRUCK_TYPES = [
  { label: "Large straight", value: "LARGE STRAIGHT" },
  { label: "Sprinter van", value: "SPRINTER VAN" },
  { label: "Small straight", value: "SMALL STRAIGHT" },
  { label: "Flatbed", value: "FLATBED" },
  { label: "Tractor", value: "TRACTOR" },
  { label: "Cargo Van", value: "CARGO" },
  { label: "Dry van", value: "DRY VAN" },
  { label: "Reefer", value: "REEFER" },
  // { label: "Cargo", value: "CARGO" },
]

export const MILES_TYPE = [
  { label: "MORE", value: "MORE" },
  { label: "LESS", value: "LESS" },
] as const

export const HIGH_DOCK_OPTIONS = [
  { value: "no", label: "No" },
  { value: "true", label: "True" },
  { value: "landing_gear", label: "Landing Gear" },
  { value: "ramps", label: "Ramps" },
] as const

export const DRIVER_STATUS_STYLES: Record<
  string,
  { label: string; color: string; bg: string }
> = {
  in_progress: { label: "In Progress", color: "#6695ec", bg: "#D2E0F9" }, // Amber theme
  accepted: { label: "Accepted", color: "#16b646", bg: "#D1FAE5" }, // Green theme
  rejected: { label: "Rejected", color: "#ff565c", bg: "#F8C9CB" }, // Red theme
}

export const VEHICLE_STATUS_STYLES: Record<
  string,
  { label: string; color: string; background: string }
> = {
  in_service: {
    label: "In Service",
    color: "#16b646", // dark green
    background: "#C3EBDE", // light green
  },
  out_of_service: {
    label: "Out of Service",
    color: "#7b7c8e", // dark yellow/brown
    background: "#CDD3EA", // light yellow
  },
  retired: {
    label: "Retired",
    color: "#ff565c", // dark red
    background: "#E5C7D3", // light red
  },
}

export const VEHICLE_STATUS_STYLES_ARRAY = [
  {
    value: "in_service",
    label: "In Service",
  },
  {
    value: "out_of_service",
    label: "Out of Service",
  },
  {
    value: "retired",
    label: "Retired",
  },
]

export const ORDER_STATUS = [
  { label: "Assigned", value: "Assigned" },
  {
    label: "Awaiting Pickup Confirmation",
    value: "Awaiting Pickup Confirmation",
  },
  { label: "Picked up", value: "Picked up" },
  {
    label: "Awaiting Delivery Confirmation",
    value: "Awaiting Delivery Confirmation",
  },
  { label: "Delivered", value: "Delivered" },
  { label: "Tonu", value: "Tonu" },
]


export const vehicleStatusOptions = [
  { value: "in_progress", label: "In Progress" },
  { value: "rejected", label: "Rejected" },
  { value: "in_review", label: "In Review" },
  { value: "accepted", label: "Accepted" },
  { value: "license_expired", label: "License Expired" },
]


export const LIMITED_LIABILITY = [
  { value: "S_CORPARATION", label: "S Corporation" },
  { value: "C_CORPARATION", label: "C Corporation" },
  { value: "PARTNERSHIP", label: "Partnership" },
];

