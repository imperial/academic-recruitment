'use client'

import GenericTable from '@/components/GenericTable'
import { Application } from '@prisma/client'
import { createColumnHelper } from '@tanstack/table-core'
import { FC } from 'react'

const columnHelper = createColumnHelper<Application>()
const columns = [
  columnHelper.accessor('referenceNumber', {
    cell: (info) => info.getValue(),
    header: 'Application Reference',
    id: 'referenceNumber'
  }),
  columnHelper.accessor('firstName', {
    cell: (info) => info.getValue(),
    header: 'First Name',
    id: 'firstName'
  }),
  columnHelper.accessor('lastName', {
    cell: (info) => info.getValue(),
    header: 'Last Name',
    id: 'lastName'
  }),
  columnHelper.accessor('edi', {
    cell: (info) => (info.getValue() ? 'Yes' : 'No'),
    header: 'EDI',
    id: 'edi'
  }),
  columnHelper.accessor('stage', {
    cell: (info) => info.getValue().toString(),
    header: 'Stage',
    id: 'stage'
  })
]

interface ApplicationTableProps {
  applications: Application[]
}

const ApplicationTable: FC<ApplicationTableProps> = ({ applications }) => {
  // @ts-expect-error generic type won't work here
  return <GenericTable data={applications} columns={columns} />
}

export default ApplicationTable
