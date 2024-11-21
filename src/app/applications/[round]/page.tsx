'use client'

import ApplicationTable from '@/components/ApplicationTable'
import PageFrame from '@/components/PageFrame'
import { Flex, Heading } from '@radix-ui/themes'
import { use } from 'react'

export default function Page({ params }: { params: Promise<{ round: string }> }) {
  const { round } = use(params)
  return (
    <PageFrame>
      <Flex direction="column" gap="2">
        <Heading>Recruitment Round: {round}</Heading>
        <ApplicationTable />
      </Flex>
    </PageFrame>
  )
}
