export type Usage = {
  id: string
  main_driver: {
    full_name: string
  }|null
  company_name: string
  owner_first_name: string
  email: string
  registration_date: string
  document_count: string
  manager: {
    full_name:string
  }
  all_document_count: string
}
