export const statuses: { value: string; label: string; variant: string }[] = [
  {
    value: "in_service",
    label: "In Service",
    variant: "success",
  },
  {
    value: "out_of_service",
    label: "Out of Service",
    variant: "neutral",
  },
  {
    value: "retired",
    label: "Retired",
    variant: "warning",
  },
]

export const driver_statuses: { value: string; label: string; variant: string }[] = [
  {
    value: "accepted",
    label: "Accepted",
    variant: "success",
  },
  {
    value: "in_progress",
    label: "In Progress",
    variant: "default",
  },
  {
    value: "rejected",
    label: "Rejected",
    variant: "error",
  },
]

export const vehicle_statuses: { value: string; label: string; variant: string }[] = [
  {
    value: "accepted",
    label: "Accepted",
    variant: "success",
  },
  {
    value: "in_progress",
    label: "In Progress",
    variant: "default",
  },
  {
    value: "rejected",
    label: "Rejected",
    variant: "error",
  },
]