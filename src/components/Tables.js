import React from 'react';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

const Tables = ({ columns, data, currentPage, setCurrentPage, totalPage }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full bg-white dark:bg-dark-white border dark:border-table-border-gray border-badge-gray rounded ">
      <div className="overflow-x-auto">
        <table className="text-black w-full">
          <thead className="bg-neutral dark:bg-renaissance-black ">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="w-full">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="text-left text-dark-1 dark:text-gray-4 font-semibold capitalize whitespace-nowrap px-5 py-3"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="">
            {table?.getRowModel().rows.map((row) => (
              <tr key={row.id} className="relative border-b-2 border-[#F5F8FA] dark:text-renaissance-dark-black ">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="text-sm capitalize whitespace-nowrap px-5 py-3 text-left"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tables;
