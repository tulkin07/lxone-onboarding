"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Company } from "@/features/registration/types";

type RegistrationContextType = {
  data: Company;
  updateData: (newData: Partial<Company>) => void;
  resetData: () => void;
};

const defaultData: Company = {
  company_name: "",
  owner_first_name: "",
  owner_second_name: "",
  email: "",
  company_phone: "",
  owner_phone: "",
  limited_liability: "S_CORPARATION",
  other_business_type: "",
  zip_code: "",
  state: "",
  city: "",
  employee_id: "",
  address: "",
  company_birth_date: new Date().toISOString().split("T")[0],
  business_type: 1,
  emergency_phone_number: "",
  driver: {
    full_name: "",
    phone_number: "",
  },
  vehicle: {
    length: 0,
    width: 0,
    height: 0,
    door_width: 0,
    door_height: 0,
    high_dock: "no",
    equipment_ids: [],
    make: "",
    model: "",
    payload: 0,
    gvw: 0,
    year: 0,
  },
};

export const RegistrationContext = createContext<RegistrationContextType | undefined>(
  undefined
);

export const RegistrationProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<Company>(defaultData);

  const updateData = (newData: Partial<Company>) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  const resetData = () => setData(defaultData);

  return (
    <RegistrationContext.Provider value={{ data, updateData, resetData }}>
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistration = () => {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error("useRegistration must be used within RegistrationProvider");
  }
  return context;
};
