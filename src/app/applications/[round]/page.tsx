import PageFrame from '@/components/PageFrame'
import ApplicationTable from '@/components/table/ApplicationTable'
import { getAllApplicationsWithResearchFields, getAllResearchFields } from '@/lib/query'
import { Flex, Heading } from '@radix-ui/themes'

export default async function Page({ params }: { params: Promise<{ round: string }> }) {
  const round = (await params).round
  const applications = await getAllApplicationsWithResearchFields(round)
  const allResearchFields = await getAllResearchFields()

  return (
    <PageFrame>
      <Flex direction="column" gap="2">
        <Heading>Recruitment Round: {round}</Heading>
        <ApplicationTable applications={applications} allResearchFields={allResearchFields} />
      </Flex>
    </PageFrame>
  )
}
