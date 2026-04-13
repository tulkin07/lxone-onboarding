"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { useSubdomains } from "@/features/registration/hooks/useSubdomains";
import { useRouter, useSearchParams } from "next/navigation";

export interface CompanyInfo {
  ucdot_number: string;
  subdomain: string;
  company_name: string;
  phone_number: string;
  email: string;
  company_logo: string | null;
  address: string;
  id: string;
  created_at: string;
  updated_at: string;
}

interface CompanyInfoContextType {
  companyInfo: CompanyInfo;
  loading: boolean;
}

const CompanyInfoContext = createContext<
  CompanyInfoContextType | undefined
>(undefined);

export const CompanyInfoProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { subdomains, isLoading } = useSubdomains();
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token"); // 🔥 TOKEN OLIB OLAMIZ

  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);

  useEffect(() => {
    
    if (!token) {
      router.replace("/not-found");
      return;
    }

    if (!isLoading && subdomains) {
      localStorage.setItem("file_token",token)
      setCompanyInfo(subdomains);
    }
  }, [subdomains, isLoading, token, router]);

  // 🔥 GLOBAL LOADING
  if (isLoading || !companyInfo) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
        <p className="text-md text-gray-700">Loading ...</p>
      </div>
    );
  }

  return (
    <CompanyInfoContext.Provider
      value={{ companyInfo, loading: false }}
    >
      {children}
    </CompanyInfoContext.Provider>
  );
};

export const useCompanyInfo = () => {
  const ctx = useContext(CompanyInfoContext);
  if (!ctx) throw new Error("useCompanyInfo must be used inside provider");
  return ctx;
};