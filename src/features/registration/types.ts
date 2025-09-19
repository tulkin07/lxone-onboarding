export type Driver = {
  full_name: string;
  phone_number: string;
};

export type Vehicle = {
  length: number;
  width: number;
  height: number;
  door_width: number;
  door_height: number;
  high_dock: "yes" | "no";
  equipment_ids: number[];
  make: string;
  model: string;
  payload: number;
  gvw: number;
  year: number;
};

export type Company = {
  company_name: string;
  owner_first_name: string;
  owner_second_name: string;
  email: string;
  company_phone: string;
  owner_phone: string;
  limited_liability: "S_CORPARATION" | "LLC" | "SOLE_PROPRIETORSHIP" | string;
  other_business_type: string;
  zip_code: string;
  state: string;
  city: string;
  employee_id: string;
  address: string;
  company_birth_date: string;
  business_type: number;
  emergency_phone_number: string;
  driver: Driver;
  vehicle: Vehicle;
};
