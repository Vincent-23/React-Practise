import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTable, usePagination, useSortBy } from 'react-table'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SortIcon from "../Icons/SortIcon";


import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  RankingInfo,
  rankItem,
  compareItems,
} from "@tanstack/match-sorter-utils";

const Table = ({ columns, datas }) => {
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState('')
  const [data, setData] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);

  useEffect(() => {
    setData(datas);
  },[datas])
  // Use the state and functions returned from useTable to build your UI
  // const {
  //   getTableProps,
  //   getTableBodyProps,
  //   headerGroups,
  //   prepareRow,
  //   page, // Instead of using 'rows', we'll use page,
  //   // which has only the rows for the active page

  //   // The rest of these things are super handy, too ;)
  //   canPreviousPage,
  //   canNextPage,
  //   pageOptions,
  //   pageCount,
  //   gotoPage,
  //   nextPage,
  //   previousPage,
  //   setPageSize,
  //   selectedFlatRows,
  //   state: { pageIndex, pageSize, selectedRowIds },
  // } = useTable(
  //   {
  //     columns,
  //     data,
  //   },
  //   usePagination,
  //   useRowSelect,
  //   hooks => {
  //     hooks.visibleColumns.push(columns => [
  //       // Let's make a column for selection
  //       {
  //         id: 'selection',
  //         // The header can use the table's getToggleAllRowsSelectedProps method
  //         // to render a checkbox
  //         Header: ({ getToggleAllPageRowsSelectedProps }) => (
  //           <div>
  //             <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
  //           </div>
  //         ),
  //         // The cell can use the individual row's getToggleRowSelectedProps method
  //         // to the render a checkbox
  //         Cell: ({ row }) => (
  //           <div>
  //             <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
  //           </div>
  //         ),
  //       },
  //       ...columns,
  //     ])
  //   }
  // )

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    columnResizeMode: "onChange",
    meta: {
      updateData: (rowIndex, columnId, value) =>
        setData((prev) =>
          prev.map((row, index) =>
            index === rowIndex
              ? {
                  ...prev[rowIndex],
                  [columnId]: value,
                }
              : row
          )
        ),
    },
  });

  
  const fuzzyFilter = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value);
    addMeta({
      itemRank,
    });
    return itemRank.passed;
  };

  // Render the UI for your table
  return (
    <div className='bg-white'>
      <table >
        <thead>
          {/* {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th className='cursor-pointer' {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))} */}
          {table.getHeaderGroups().map((headerGroup) => (
          <tr className="tr" key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th className="th" w={header.getSize()} key={header.id}>
                {header.column.columnDef.header}
                {/* {header.column.getCanSort() && (
                  // <Icon
                  //   as={SortIcon}
                  //   mx={3}
                  //   fontSize={14}
                  //   onClick={header.column.getToggleSortingHandler()}
                  // />
                )} */}
                {
                  {
                    asc: <ArrowDropUpIcon />,
                    desc: <ArrowDropDownIcon />,
                  }[header.column.getIsSorted()]
                }
                <span
                  onMouseDown={header.getResizeHandler()}
                  onTouchStart={header.getResizeHandler()}
                  className={`resizer ${
                    header.column.getIsResizing() ? "isResizing" : ""
                  }`}
                />
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
        <p mb={2}>
        Page {table.getState().pagination.pageIndex + 1} of{" "}
        {table.getPageCount()}
      </p>
      <div>
      <button
          onClick={() => table.previousPage()}
          isDisabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          onClick={() => table.nextPage()}
          isDisabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
      </div>
      </table>
      {/* 
          Pagination can be built however you'd like. 
          This is just a very basic UI implementation:
        */}

    </div>
  )
}

export default Table
