'use client'

import Dropdown from '@/components/Dropdown'
import AcademicFieldDialog from '@/components/dialog/AcademicFieldDialog'
import CommentDialog from '@/components/dialog/CommentDialog'
import GenericTable, { updateOrAddColumnFilter } from '@/components/table/GenericTable'
import { prettifyCapitalisedEnumValue } from '@/lib/utils'
import { Application, Comment, ResearchField, Stage } from '@prisma/client'
import { Card, Flex, Text } from '@radix-ui/themes'
import { ColumnFilter, ColumnFiltersState, createColumnHelper } from '@tanstack/table-core'
import { FC, useMemo, useState } from 'react'

export const ALL_DROPDOWN_OPTION = 'All'

export type ApplicationRow = Application & {
  researchFields: ResearchField[]
  comments: Comment[]
}

interface ApplicationTableProps {
  applications: ApplicationRow[]
  allResearchFields: ResearchField[]
}

const ApplicationTable: FC<ApplicationTableProps> = ({ applications, allResearchFields }) => {
  const [stageFilter, setStageFilter] = useState<string>(ALL_DROPDOWN_OPTION)
  const [researchFieldFilter, setResearchFieldFilter] = useState<string>(ALL_DROPDOWN_OPTION)
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const columnHelper = createColumnHelper<ApplicationRow>()
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
        id: 'researchFields',
        header: 'Research Fields',
        cell: (info) => info.row.original.researchFields.map((field) => field.name).join(', '),
        filterFn: (row, _columnId, filterValue) => {
          return row.original.researchFields.some((field) => field.name === filterValue)
        }
      }),
      columnHelper.accessor('stage', {
        cell: (info) => prettifyCapitalisedEnumValue(info.getValue()),
        header: 'Stage',
        id: 'stage'
      }),
      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: (info) => (
          <Flex gap="1">
            <CommentDialog
              applicationId={info.row.original.id}
              comments={info.row.original.comments}
            />
            <AcademicFieldDialog
              applicationId={info.row.original.id}
              allResearchFields={allResearchFields}
              applicationResearchFields={info.row.original.researchFields.map(
                (field) => field.name
              )}
            />
          </Flex>
        )
      })
    ],
    [columnHelper, allResearchFields]
  )

  return (
    <Flex direction="column" gap="1">
      <Card className="bg-yellow-200">
        <Flex gap="2" align="center">
          <Text>Stage:</Text>
          <Dropdown
            choices={[ALL_DROPDOWN_OPTION, ...Object.keys(Stage)]}
            currentChoice={stageFilter}
            onChoiceChange={(value) => {
              updateColumnFilters(setStageFilter, value, 'stage', setColumnFilters, columnFilters)
            }}
            valueFormatter={prettifyCapitalisedEnumValue}
          />

          <Text>Research Field:</Text>
          <Dropdown
            choices={[ALL_DROPDOWN_OPTION, ...allResearchFields.map((field) => field.name)]}
            currentChoice={researchFieldFilter}
            onChoiceChange={(value) => {
              updateColumnFilters(
                setResearchFieldFilter,
                value,
                'researchFields',
                setColumnFilters,
                columnFilters
              )
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

function updateColumnFilters(
  setFilter: (value: ((prevState: string) => string) | string) => void,
  value: string,
  columnId: string,
  setColumnFilters: (
    value: ((prevState: ColumnFilter[]) => ColumnFilter[]) | ColumnFilter[]
  ) => void,
  columnFilters: ColumnFilter[]
) {
  setFilter(value)
  if (value === ALL_DROPDOWN_OPTION)
    setColumnFilters(columnFilters.filter((filter) => filter.id !== columnId))
  else setColumnFilters(updateOrAddColumnFilter(columnFilters, columnId, value))
}

export default ApplicationTable
