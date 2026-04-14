"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
  useRef,
} from "react";
import { useSubdomains } from "@/features/registration/hooks/useSubdomains";
import { useRouter, useSearchParams } from "next/navigation";
import { useToastMessage } from "@/hooks/useToastMessage";
import { Button } from "@/components/Button";

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
  const { subdomains, isLoading, error, isError, refetch } = useSubdomains();
  const { getErrorMessage } = useToastMessage();
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token"); // 🔥 TOKEN OLIB OLAMIZ

  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
  const lastErrorKeyRef = useRef<string | null>(null);

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

  useEffect(() => {
    if (!isError || !error) return;
    const key =
      (error as any)?.response?.status ||
      (error as any)?.message ||
      JSON.stringify(error);
    if (lastErrorKeyRef.current === String(key)) return;
    lastErrorKeyRef.current = String(key);
    getErrorMessage(error as any);
  }, [isError, error]);

  if (isError) {
    return (
      <div className="flex min-h-[70vh] w-full flex-col items-center justify-center gap-3 px-4 text-center">
        <div className="max-w-md">
          <p className="text-base font-semibold text-gray-900 dark:text-gray-50">
            Couldn’t load company info
          </p>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Please check your connection and try again.
          </p>
        </div>
        <div className="mt-2 w-full max-w-xs">
          <Button className="w-full" type="button" onClick={() => refetch()}>
            Try again
          </Button>
        </div>
      </div>
    );
  }

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