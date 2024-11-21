'use client'

import { Table } from '@radix-ui/themes'
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'

interface GenericTableProps<T, V> {
  data: T[]
  columns: ColumnDef<T, V>[]
}

const GenericTable = <T, V>({ data, columns }: GenericTableProps<T, V>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
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
                <Table.Cell key={id}>
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

export default GenericTable
