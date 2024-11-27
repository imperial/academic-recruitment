import PageFrame from '@/components/PageFrame'
import RoundEntry from '@/components/RoundEntry'
import { getAllApplicationRounds } from '@/lib/query'
import { Flex, Heading } from '@radix-ui/themes'
import { redirect } from 'next/navigation'

import { auth } from '../../auth'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const session = await auth()
  if (!session) {
    redirect('/auth/login')
  }

  const allRounds = await getAllApplicationRounds()

  return (
    <PageFrame>
      <Flex direction="column">
        <Heading>Academic Recruitment</Heading>
        <RoundEntry allRounds={allRounds} />
      </Flex>
    </PageFrame>
  )
}
