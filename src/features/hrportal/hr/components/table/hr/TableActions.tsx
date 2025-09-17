"use client";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Link } from "lucide-react";
import { useState, useEffect } from "react";
import { DrawerAddHr } from "../../DrawerAddHr";
import { useRouter, useSearchParams } from "next/navigation";

// custom debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function TableActions() {
  const [openModal, setOpenModal] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  // input uchun local state
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const debouncedSearch = useDebounce(search, 500); // 500ms kutadi

  // debounced search URL ga yoziladi
  useEffect(() => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (debouncedSearch) {
      newParams.set("search", debouncedSearch);
    } else {
      newParams.delete("search");
    }
    router.replace(`?${newParams.toString()}`);
  }, [debouncedSearch]);

  return (
    <>
      <div className="flex w-full items-center justify-between pb-4">
        <div className="flex w-full items-center gap-3">
          <div style={{ width: "200px" }}>
            <Input
              value={search}
              placeholder="Search..."
              className="text-sm"
              type="search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button className="flex items-center gap-1 text-sm font-normal">
            <Link size={16} />
            <span className="pl-1">Invite Link</span>
          </Button>
          <Button
            className="text-sm font-normal"
            onClick={() => setOpenModal(true)}
          >
            Add Request
          </Button>
        </div>
      </div>
      <DrawerAddHr open={openModal} closeDrawer={() => setOpenModal(false)} />
    </>
  );
}
