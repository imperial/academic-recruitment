'use client'

import Dropdown from '@/components/Dropdown'
import AcademicFieldDialog from '@/components/dialog/AcademicFieldDialog'
import GenericTable from '@/components/table/GenericTable'
import { ApplicationResearchFieldWithName } from '@/lib/types'
import { prettifyCapitalisedEnumValue } from '@/lib/utils'
import { Application, ResearchField, Stage } from '@prisma/client'
import { Card, Flex, Text } from '@radix-ui/themes'
import { ColumnFiltersState, createColumnHelper } from '@tanstack/table-core'
import { FC, useMemo, useState } from 'react'

const ALL_DROPDOWN_OPTION = 'All'

interface ApplicationTableProps {
  applications: Application[]
  allResearchFields: ResearchField[]
  applicationsWithResearchFields: ApplicationResearchFieldWithName[]
}

const ApplicationTable: FC<ApplicationTableProps> = ({
  applications,
  allResearchFields,
  applicationsWithResearchFields
}) => {
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
      columnHelper.display({
        id: 'fields',
        header: 'Research Fields',
        cell: (info) =>
          applicationsWithResearchFields
            .filter((awrf) => awrf.applicationId === info.row.original.id)
            .map((awrf) => awrf.researchField.name)
            .join(', ')
      }),
      columnHelper.accessor('stage', {
        cell: (info) => prettifyCapitalisedEnumValue(info.getValue()),
        header: 'Stage',
        id: 'stage'
      }),
      columnHelper.display({
        id: 'forms',
        header: 'Forms',
        cell: (info) => (
          <AcademicFieldDialog
            applicationId={info.row.original.id}
            allResearchFields={allResearchFields}
            applicationResearchFields={applicationsWithResearchFields
              .filter((awrf) => awrf.applicationId === info.row.original.id)
              .map((awrf) => awrf.researchField.name)}
          />
        )
      })
    ],
    [columnHelper, allResearchFields, applicationsWithResearchFields]
  )

  return (
    <Flex direction="column" gap="1">
      <Card className="bg-yellow-200">
        <Flex gap="2" align="center">
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
      </Card>
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
