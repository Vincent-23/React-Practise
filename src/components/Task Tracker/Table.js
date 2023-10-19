import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTable, usePagination, useSortBy } from 'react-table'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import SortIcon from "../Icons/SortIcon";



import {
  flexRender,
} from "@tanstack/react-table";

const Table = ({ table }) => {


  // Use the state and functions returned from useTable to build your UI

  // Render the UI for your table
  return (
    <div className=''>
      <table className='w-full border-collapse'>
        <thead className='bg-red'>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className='bg-gray-700'>
            {headerGroup.headers.map((header) => (
              <th w={header.getSize()} key={header.id} className='text-white p-3'>
                <div className='flex'>
                  {header.column.columnDef.header}
                  {header.column.getCanSort() && (
                    <div
                      onClick={header.column.getToggleSortingHandler()}
                    ><ImportExportIcon /></div>
                  )}
                  {/* {
                    {
                      asc: " 🔼",
                      desc: " 🔽",
                    }[header.column.getIsSorted()]
                  } */}
                  {/* <Box
                    onMouseDown={header.getResizeHandler()}
                    onTouchStart={header.getResizeHandler()}
                    className={`resizer ${
                      header.column.getIsResizing() ? "isResizing" : ""
                    }`}
                  /> */}
                </div>
              </th>
            ))}
          </tr>
        ))}
          
        </thead>
        <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr className="tr" key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td className="td" w={cell.column.getSize()} key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
        </tbody>
        
      </table>
      {/* 
          Pagination can be built however you'd like. 
          This is just a very basic UI implementation:
        */}

    </div>
  )
}

export default Table
