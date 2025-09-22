"use client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const PAGE_ROUTE_KEYS = {
  "/dashboard": "Dashboard",
  "/dashboard/drivers": "Drivers",
  "/dashboard/loads": "Loads",
  "/dashboard/driver-bids": "Driver bids",
  "/dashboard/accounting": "Accounting",
  "/dashboard/settings": "Settings",
  "/dashboard/dispatch": "Dispatch",
};

export function Breadcrumbs() {
  const pathname = usePathname();

  // Generate the breadcrumb segments
  const segments = getBreadcrumbSegments(pathname);

  return (
    <>
      <nav aria-label="Breadcrumb" className="ml-2">
        <ol role="list" className="flex items-center space-x-3 text-sm">
          {segments.map((segment, index) => (
            <li key={segment.path} className="flex">
              <div className="flex items-center">
                <Link
                  href={segment.path}
                  aria-current={
                    index === segments.length - 1 ? "page" : undefined
                  }
                  className={`hover:text-gray-700 hover:dark:text-gray-300 ${
                    index === segments.length - 1
                      ? "font-medium text-gray-900 dark:text-gray-50"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {segment.label}
                </Link>
              </div>

              {index < segments.length - 1 && (
                <ChevronRight
                  className="ml-3 size-4 shrink-0 text-gray-600 dark:text-gray-400"
                  aria-hidden="true"
                />
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

/**
 * Generates breadcrumb segments from the pathname
 */
function getBreadcrumbSegments(pathname: string) {
  // Start with the root path
  const segments = [];

  // Skip processing if the path is invalid or not in the dashboard
  if (!pathname || !pathname.startsWith("/dashboard")) {
    return [];
  }

  // Split the path into parts
  const pathParts = pathname.split("/").filter(Boolean);

  // Build the path segments incrementally
  let currentPath = "";

  for (let i = 0; i < pathParts.length; i++) {
    // Build the current path segment
    currentPath += "/" + pathParts[i];

    // Check if this is a known route
    if (PAGE_ROUTE_KEYS[currentPath as keyof typeof PAGE_ROUTE_KEYS]) {
      segments.push({
        path: currentPath,
        label: PAGE_ROUTE_KEYS[currentPath as keyof typeof PAGE_ROUTE_KEYS],
      });
    } else if (i > 0) {
      // This might be a dynamic route or unknown path
      // Try to format it nicely by capitalizing and replacing hyphens
      const label = pathParts[i]
        .replace(/-/g, " ")
        .replace(/^\w/, (c) => c.toUpperCase());

      segments.push({
        path: currentPath,
        label,
      });
    }
  }

  return segments;
}
