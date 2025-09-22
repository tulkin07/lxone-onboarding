"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChevronDown, Building2, Check } from "lucide-react";
import { useRouter } from "next/navigation";

interface ICompany {
  id: number;
  name: string;
  phone_number: string;
  email_address: string;
  company_logo: string;
  role: string;
}

interface ISingleCompanyResult {
  id: number;
  name: string;
  phone_number: string;
  email_address: string;
  load_email: boolean;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function CompanySelector() {
  const router = useRouter();
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<ICompany | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Get access token
  const getAccessToken = () => localStorage.getItem("access_token");

  // Get selected company from localStorage
  const getSelectedCompanyId = () =>
    localStorage.getItem("selected-company-id");

  // Fetch companies
  const fetchCompanies = async () => {
    const token = getAccessToken();
    if (!token) {
      router.push("/auth/login");
      return;
    }

    try {
      const { data } = await axios.get(`${BASE_URL}/user/companies`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const items: ICompany[] = data.items || [];
      setCompanies(items);

      const selectedId = getSelectedCompanyId();
      if (selectedId) {
        const selected = items.find((c) => String(c.id) === selectedId);
        if (selected) setSelectedCompany(selected);
      }
    } catch (error) {
      console.error("Error fetching companies:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch single company details
  const fetchSingleCompany = async (company_id: number) => {
    const token = getAccessToken();
    if (!token) return;

    try {
      const { data } = await axios.get<ISingleCompanyResult>(
        `${BASE_URL}/companies/${company_id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.load_email) {
        setSelectedCompany({
          id: data.id,
          name: data.name,
          phone_number: data.phone_number,
          email_address: data.email_address,
          company_logo: "",
          role: "",
        });
        saveCompanySelection(data.id);
      } else {
        await startLoadEmail(company_id);
      }
    } catch (error) {
      console.error("Error fetching single company:", error);
    }
  };

  // Start load email
  const startLoadEmail = async (company_id: number) => {
    try {
      router.push(`${BASE_URL}/load_email/start?company_id=${company_id}`);
    } catch (error) {
      console.error("Error starting load email:", error);
    }
  };

  // Save selected company in localStorage
  const saveCompanySelection = (companyId: number) => {
    localStorage.setItem("selected-company-id", String(companyId));
    window.location.reload(); // Reload after selection
  };

  // Handle company selection
  const handleCompanySelect = async (company: ICompany) => {
    const currentId = getSelectedCompanyId();
    if (String(company.id) !== currentId) {
      await fetchSingleCompany(company.id);
    } else {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center space-x-2 animate-pulse">
        <div className="h-6 w-6 rounded-full bg-gray-300" />
        <div className="h-4 w-24 bg-gray-300 rounded" />
      </div>
    );
  }

  if (companies.length === 0) {
    return (
      <div className="text-gray-500 text-sm flex items-center gap-2">
        <Building2 className="h-4 w-4" />
        No companies available
      </div>
    );
  }

  return (
    <div className="relative w-72">
      {/* Selected Company Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between px-3 py-2 w-full bg-white dark:bg-gray-900 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
      >
        <div className="flex items-center gap-2 truncate">
          {selectedCompany?.company_logo ? (
            <img
              src={selectedCompany.company_logo}
              alt="logo"
              className="h-6 w-6 rounded-full object-cover"
            />
          ) : (
            <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
              <Building2 className="h-4 w-4 text-blue-600" />
            </div>
          )}
          <span className="truncate text-gray-900 dark:text-white text-sm">
            {selectedCompany ? selectedCompany.name : "Select a company"}
          </span>
        </div>
        <ChevronDown
          className={`h-4 w-4 text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute z-20 mt-2 w-72 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {companies.map((company) => (
              <button
                key={company.id}
                onClick={() => handleCompanySelect(company)}
                className="flex items-center w-full px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                {company.company_logo ? (
                  <img
                    src={company.company_logo}
                    alt="logo"
                    className="h-6 w-6 rounded-full object-cover mr-3"
                  />
                ) : (
                  <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <Building2 className="h-4 w-4 text-blue-600" />
                  </div>
                )}
                <div className="flex-1 text-left">
                  <p className="text-gray-900 dark:text-white text-sm truncate">
                    {company.name}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs truncate">
                    {company.email_address}
                  </p>
                </div>
                {selectedCompany?.id === company.id && (
                  <Check className="h-4 w-4 text-blue-600" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
