'use client'

import Dropdown from '@/components/Dropdown'
import GenericTable from '@/components/GenericTable'
import { prettifyCapitalisedEnumValue } from '@/lib/utils'
import { Application, Stage } from '@prisma/client'
import { Flex, Text } from '@radix-ui/themes'
import { ColumnFiltersState, createColumnHelper } from '@tanstack/table-core'
import { FC, useMemo, useState } from 'react'

const ALL_DROPDOWN_OPTION = 'All'

interface ApplicationTableProps {
  applications: Application[]
}

const ApplicationTable: FC<ApplicationTableProps> = ({ applications }) => {
  const [stage, setStage] = useState<string>(ALL_DROPDOWN_OPTION)
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const columnHelper = createColumnHelper<Application>()
  const columns = useMemo(
    () => [
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
        cell: (info) => prettifyCapitalisedEnumValue(info.getValue()),
        header: 'Stage',
        id: 'stage'
      })
    ],
    [columnHelper]
  )

  return (
    <Flex direction="column" gap="1">
      <Flex align="center" justify="start" gap="2">
        <Text>Stage:</Text>
        <Dropdown
          choices={[ALL_DROPDOWN_OPTION, ...Object.keys(Stage)]}
          currentChoice={stage}
          onChoiceChange={(value) => {
            setStage(value)
            if (value === ALL_DROPDOWN_OPTION) setColumnFilters([])
            else setColumnFilters([{ id: 'stage', value }])
          }}
        />
      </Flex>
      <GenericTable
        data={applications}
        columns={columns}
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
      />
    </Flex>
  )
}

export default ApplicationTable
