import { DocumentFile } from "./components/HrVehicleDocuments"

export interface Hr {
  id: number
  full_name: string
}

export interface HrItem {
  company_id: number
  company_name: string
  owner_first_name: string
  owner_second_name: string
  email: string
  company_phone: string
  owner_phone: string
  id: number
  uuid: string
  registration_date: string
  created_at: string
  vehicle_in_progress_status_count: number
  vehicle_accepted_status_count: number
  vehicle_rejected_status_count: number
  vehicle_review_status_count: number
  expired_documents_vehicle_count: number
  manager: Hr
  document_count: number
  all_document_count: number
  link_signature: string
}

export interface HrResponseType {
  items: HrItem[]
  total: number
  page: number
  size: number
  pages: number
}

export interface HrFormData {
  company_id:string
  company_name: string
  owner_first_name: string
  owner_second_name: string
  email: string
  company_phone: string
  owner_phone: string
  zip_code: string
  state: number | string
  city: string
  employee_id: string
  address: string
  company_birth_date: string
  business_type: number | string
  created_by_id: number
  emergency_phone_number: string
  title: string
  mc_number: number | string
  usdot_number: number | string
  w9: string
  void_check: string
  ms_dot: string
  additional_doc3: string
  is_taxt_exempt: boolean
  exemot_payee_code: string
  fatca_reporting_code: string
  deposit_company_name: string
  city_state_zip: string
  street_address: string
  bank_name: string
  accounting_number:  string
  routing_number: string
  terms_accepted: boolean
  owner_uuid? :string
  uuid?:string
  id?:string
}
export type HrEditFormType = {
  company_name: string
  first_name: string
  last_name: string
  email: string
  company_phone: string
  applicant_phone: string
  zip_code: string
  state: string
  city: string
  employer_id: string
  address: string
  company_birth: string
  emergency_phone: string
  title: string
  business_type: string
  mc: string
  usdot: string
  exempt_payee_code: string
  fatca_exemption_code: string
  deposit_company_name: string
  deposit_city_state_zip: string
  deposit_street_address: string
  bank_name: string
  accounting_number: string
  routing_number: string
  exempt: boolean
  w9_form: string
  void_check: string
  ms_dot: string
  additional_files: string
}
// Har bir State obyekti uchun interfeys
export interface State {
  id: number
  name: string
  short_name: string
}

// API response interfeysi
export interface StatesResponse {
  count: number
  next: string | null
  previous: string | null
  results: State[]
}


export interface BusinessType {
  id: number;
  name: string;
}[]

// ========Vehicle=========

export type HrVehicleItem = {
  status: "in_progess" | "completed" | "pending"; // agar boshqa statuslar bo'lsa qo'shing
  truck_type: string; // masalan: "cargo"
  make: string;
  model: string;
  payload: number;
  gvw: number;
  year: number;
  plate: string;
  license_expire_date: string; // ISO format (yyyy-mm-dd)
  license_expire_state: number;
  insurance_company: string;
  insurance_expire_date: string;
  policy: string;
  vehicle_vin: string;
  length: number;
  width: number;
  height: number;
  door_width: number;
  door_height: number;
  high_dock: "yes" | "no";
  equipment_name: string[];
  equipment_short_name: string[];
  vehicle_registration_document: string;
  insurance_certificate: string;
  photo_left_side: string;
  photo_right_side: string;
  cargo_space_photo: string;
  owner_company_id: number;
  main_driver_id: number;
  secondary_driver_id: number;
  id: number;
};

export type HrVehicleResponse = {
  items: HrVehicleItem[];
  total: number;
  page: number;
  size: number;
  pages: number;
};


// ========Drivers=========
type HrDriverStatus = "in_progress" | "completed" | "pending"; 

export interface HrDriverItem {
  id: number;
  full_name: string;
  gmail: string;
  app: string;
  phone_number: string;
  driver_status: HrDriverStatus;
}

export interface HrDriversResponse {
  items: HrDriverItem[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

export interface HrDriverCreate {
  full_name: string;
  birth_date: string; // ISO format: "YYYY-MM-DD"
  address: string;
  city: string;
  state: string;
  zip_code: string;
  ssn?: string; // optional bo'lishi mumkin
  gmail: string;
  phone_number: string;
  emergency_phone_number: string;
  license_number?: string;
  license_state: string;
  license_type?: string;
  license_expiration_date: string; // ISO format: "YYYY-MM-DD"
  driver_license: string; // File URL
  driving_record: string; // File URL
  passport: string; // File URL
  owner_company_id: string;
}

export interface VehicleCreate {
  status: string; // If these are the only possible statuses
  truck_type: "cargo" | "flatbed" | "reefer" | string; // Add other possible types or keep as string
  make: string;
  model: string;
  payload: string;
  gvw: string;
  year: string;
  plate: string;
  license_expire_date: string; // ISO date format (YYYY-MM-DD)
  license_expire_state: string; // Assuming this is an ID or code for the state
  insurance_company: string;
  insurance_expire_date: string;
  policy: string;
  vehicle_vin: string;
  length: string;
  width: string;
  height: string;
  door_width: string;
  door_height: string;
  high_dock: "yes" | "no";
  equipment_name: string[];
  equipment_short_name: string[];
  vehicle_registration_document: string;
  insurance_certificate: string;
  photo_left_side: string;
  photo_right_side: string;
  cargo_space_photo: string;
  owner_company_id: string;
  main_driver_id: string;
  secondary_driver_id: string;
  company_id: string;
}


export interface CreateVehicleSetupDto { 
  id?:string,
  truck_type: string
  make: string
  model: string
  payload: string
  gvw:  string
  year: string
  plate: string
  license_expire_date: string
  license_expire_state: string
  insurance_company: string
  insurance_expire_date: string
  policy: string
  vehicle_vin: string
  length:  string
  width:  string
  height:  string
  door_width:string
  door_height:  string
  high_dock: string
  vehicle_registration_document: string
  insurance_certificate: string
  photo_left_side: string
  photo_right_side: string
  cargo_space_photo: string
  main_driver_id: string
  secondary_driver_id: string
  equipment_ids: string[]
  owner_company_id?:string,
  company_id?:string
   documents: DocumentFile[]
}
