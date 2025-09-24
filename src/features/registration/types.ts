export type Driver = {
  full_name: string;
  phone_number: string;
};

export type Vehicle = {
  length: string;
  width: string;
  height: string;
  door_width: string;
  door_height: string;
  high_dock:  | string;
  equipment_ids: string[];
  make: string;
  model: string;
  payload: string;
  gvw: string;
  year: string|null;
};

export type Company = {
  company_name: string;
  owner_first_name: string;
  owner_second_name: string;
  email: string;
  company_phone: string;
  owner_phone: string;
  limited_liability: string|null;
  other_business_type: string|null;
  zip_code: string;
  state: string|undefined;
  city: string;
  employee_id: string;
  address: string;
  company_birth_date: string|null;
  business_type: string|undefined;
  emergency_phone_number: string;
  driver: Driver;
  vehicle: Vehicle;
  exemot_payee_code:string
  fatca_reporting_code:string
  title:string
};
