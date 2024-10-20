import React from "react";
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
import {UsageEntry} from "../../types/usage"; // Import the CSS file

interface DataTableProps {
  data: UsageEntry[];
  isLoading: boolean;
}

const DataTable: React.FC<DataTableProps> = ({ data, isLoading }) => {
  const {sorting, setSorting} = useSorting();

  const columns = [
    {
      header: () => 'Message ID',
      accessorKey: 'message_id', // use built-in sorting function by name
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
    }
  ]

  const table = useReactTable({
    columns,
    data,
    state: {
      sorting: sorting
    },
    onSortingChange: setSorting,
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

export default DataTable;
