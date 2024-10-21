import React, {useEffect} from "react";
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel, getSortedRowModel,
} from "@tanstack/react-table";
import "./datatable.css";
import useSorting from "../../state/dataSort";
import prettifyDateTime from "../../utility/tableDateTime";
import Placeholder from "../loading/placeholder";
import {UsageEntry} from "../../types/usage";
import { useSearchParams } from "react-router-dom";

interface UsageTablesProps {
  data: UsageEntry[];
  isLoading: boolean;
}

const UsageTable: React.FC<UsageTablesProps> = ({ data, isLoading }) => {
  const {sorting, setSorting} = useSorting();
  const [searchParams, setSearchParams] = useSearchParams(); // For URL handling


  useEffect(() => {
    // Fetch initial sorting from URL and update state
    const sortParam = searchParams.get("sort");
    const orderParam = searchParams.get("order");

    if (sortParam && orderParam) {
      setSorting([
        {
          id: sortParam,
          desc: orderParam === "desc",
        },
      ]);
    }
  }, [searchParams, setSorting]);

  const columns = [
    {
      header: () => 'Message ID',
      accessorKey: 'message_id',
    },
    {
      header: () => 'Timestamp',
      accessorKey: 'timestamp',
      cell: (info: { getValue: () => string }) => prettifyDateTime(info.getValue()),
    },
    {
      header: () => 'Report Name',
      accessorKey: 'report_name',
    },
    {
      header: () => 'Credits Used',
      accessorKey: 'credits_used',
      cell: (info: {getValue: () => number }) => info.getValue().toFixed(2)
    }
  ]

  const table = useReactTable({
    columns,
    data,
    state: {
      sorting: sorting
    },
    onSortingChange: (newSorting) => {
      setSorting(newSorting);
      const newSortingValue = newSorting instanceof Function ? newSorting(sorting) : newSorting

      if (newSortingValue.length > 0) {
        setSearchParams({
          sort: newSortingValue[0].id,
          order: newSortingValue[0].desc ? "desc" : "asc",
        });
      } else {
        setSearchParams({}); // Clear sorting params if not sorted
      }
    },
    pageCount: Math.ceil(data.length / 10), // Total pages based on data length
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableSorting: true, // Enable sorting
  });

  if (isLoading) {
    return (
      <div className="table-container">
        <Placeholder/>
      </div>
    );
  }

  return (
    <div className="table-container" data-testid="table-container">
      <table className="table">
        <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} onClick={header.column.getToggleSortingHandler()}>
                {flexRender(header.column.columnDef.header, header.getContext())}
                <span>
                    {header.column.getIsSorted() === "asc" ? " 🔼" : header.column.getIsSorted() === "desc" ? " 🔽" : ""}
                  </span>
              </th>
            ))}
          </tr>
        ))}
        </thead>
        <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
          {"<<"}
        </button>
        <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </button>
        <span>{`Page ${table.getState().pagination.pageIndex + 1} of ${table.getPageCount()}`}</span>
        <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </button>
        <button onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>
          {">>"}
        </button>
      </div>
    </div>
  );
};

export default UsageTable;
