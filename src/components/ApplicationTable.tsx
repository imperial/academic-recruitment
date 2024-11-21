import GenericTable from '@/components/GenericTable'
import { createColumnHelper } from '@tanstack/table-core'
import { FC, useMemo } from 'react'

interface TableRow {
  applicationId: number
}

const ApplicationTable: FC = () => {
  const columnHelper = createColumnHelper<TableRow>()
  const columns = useMemo(
    () => [
      columnHelper.accessor('applicationId', {
        cell: (info) => info.getValue(),
        header: 'CID',
        id: 'cid'
      })
    ],
    [columnHelper]
  )

  return <GenericTable data={[]} columns={columns} />
}

export default ApplicationTable
