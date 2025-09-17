import { flexRender } from "@tanstack/react-table";

export default function TableHeader({ table }: { table: any }) {
  return (
    <thead className="bg-gray-100 dark:bg-gray-700">
      {table.getHeaderGroups().map((headerGroup: any) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header: any) => (
            <th
              key={header.id}
              className="px-6 py-3 text-left text-xs font-medium  tracking-wider text-gray-500 dark:text-gray-300"
            >
              {flexRender(header.column.columnDef.header, header.getContext())}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
}
