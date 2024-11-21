'use client'

import ApplicationTable from '@/components/ApplicationTable'
import { Flex, Heading } from '@radix-ui/themes'
import { use } from 'react'

export default function Page({ params }: { params: Promise<{ round: string }> }) {
  const { round } = use(params)
  return (
    <Flex>
      <Heading>Recruitment Round: {round}</Heading>
      <ApplicationTable />
    </Flex>
  )
}
