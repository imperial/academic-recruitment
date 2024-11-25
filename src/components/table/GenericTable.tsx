'use client'

import { Table } from '@radix-ui/themes'
import {
  ColumnDef,
  FilterFn,
  OnChangeFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable
} from '@tanstack/react-table'
import { ColumnFilter, ColumnFiltersState } from '@tanstack/table-core'
import { produce } from 'immer'

interface GenericTableProps<T> {
  data: T[]
  columns: ColumnDef<T, any>[]
  columnFilters: ColumnFiltersState
  setColumnFilters: OnChangeFn<ColumnFiltersState>
  customFilterFn?: FilterFn<any>
}

const GenericTable = <T,>({
  data,
  columns,
  columnFilters,
  setColumnFilters,
  customFilterFn = () => true
}: GenericTableProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: {
      columnFilters
    },
    filterFns: {
      customFilter: customFilterFn
    }
  })

  return (
    <>
      <Table.Root className="border-2 border-gray-300">
        <Table.Header>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Row key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Table.ColumnHeaderCell
                  key={header.id}
                  className="bg-blue-100 border-b-2 border-black border-r-1 border"
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </Table.ColumnHeaderCell>
              ))}
            </Table.Row>
          ))}
        </Table.Header>

        <Table.Body>
          {table.getRowModel().rows.map((row, i) => (
            <Table.Row
              key={row.id}
              className={`align-middle ${i % 2 == 0 ? 'bg-gray-200' : 'bg-white'}`}
            >
              {row.getVisibleCells().map((cell, id) => (
                <Table.Cell key={id} className="border-r border-gray-500">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  )
}

export function updateOrAddColumnFilter(
  columnFilters: ColumnFilter[],
  columnId: string,
  value: string
): ColumnFilter[] {
  return produce(columnFilters, (draft) => {
    const index = draft.findIndex((filter) => filter.id === columnId)
    if (index === -1) draft.push({ id: columnId, value })
    else draft[index].value = value
  })
}

export default GenericTable
