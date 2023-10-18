import React, {useState} from 'react';
import { format} from 'date-fns'
import { useTable, usePagination, useRowSelect } from 'react-table'
import {
    createColumnHelper,
    getCoreRowModel,
    flexRender,
    useReactTable,
    getSortedRowModel,
    SortingState,
    PaginationState,
    getPaginationRowModel,
    sortingFns,
    getFilteredRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFacetedMinMaxValues,
  } from "@tanstack/react-table";
  import {
    RankingInfo,
    rankItem,
    compareItems,
  } from "@tanstack/match-sorter-utils";

const Table = ({ columns, data, tasks, setTasks, globalFilter, setGlobalFilter}) => {
  const [ sorting, setSorting ] = useState([]);
  const [filtering, setFiltering] = useState('')
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
      columns: columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      state: {
        sorting: sorting,
        globalFilter: filtering,
      },
      onSortingChange: setSorting,
      onGlobalFilterChange: setFiltering,
    })

    
const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
      const defaultRef = React.useRef()
      const resolvedRef = ref || defaultRef
  
      React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate
      }, [resolvedRef, indeterminate])
  
      return (
        <>
          <input type="checkbox" ref={resolvedRef} {...rest} />
        </>
      )
    }
  )
  const fuzzyFilter = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value);
    addMeta({
      itemRank,
    });
    return itemRank.passed;
  };

  const reactTable = useReactTable({
    data: tasks,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
      globalFilter,
    },
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
  });

  
    // Render the UI for your table
    return (
      <>
        {/* <pre>
          <code>
            {JSON.stringify(
              {
                pageIndex,
                pageSize,
                pageCount,
                canNextPage,
                canPreviousPage,
              },
              null,
              2
            )}
          </code>
        </pre> */}
        <table>
          <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder ? null : (
                    <div>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {
                        { asc: '🔼', desc: '🔽' }[
                          header.column.getIsSorted() ?? null
                        ]
                      }
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
          </thead>
          <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
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
        
      </>
    )
  }

  export default Table
  