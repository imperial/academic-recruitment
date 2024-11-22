import ApplicationTable from '@/components/ApplicationTable'
import PageFrame from '@/components/PageFrame'
import { getAllApplications } from '@/lib/query'
import { Flex, Heading } from '@radix-ui/themes'

export default async function Page({ params }: { params: Promise<{ round: string }> }) {
  const round = (await params).round
  const applications = await getAllApplications(round)

  return (
    <PageFrame>
      <Flex direction="column" gap="2">
        <Heading>Recruitment Round: {round}</Heading>
        <ApplicationTable applications={applications} />
      </Flex>
    </PageFrame>
  )
}
