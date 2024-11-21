'use client'

import { Heading } from '@radix-ui/themes'
import { use } from 'react'

export default function Page({ params }: { params: Promise<{ round: string }> }) {
  const { round } = use(params)
  return <Heading>Recruitment Round: {round}</Heading>
}
