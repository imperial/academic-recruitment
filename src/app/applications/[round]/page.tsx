import PageFrame from '@/components/PageFrame'
import { HomepageLinkButton } from '@/components/dialog/LinkButton'
import ApplicationTable from '@/components/table/ApplicationTable'
import { getAllApplicationRows, getAllResearchFields } from '@/lib/query'
import { Flex, Heading } from '@radix-ui/themes'

export default async function Page({ params }: { params: Promise<{ round: string }> }) {
  const round = (await params).round
  const applications = await getAllApplicationRows(round)
  const allResearchFields = await getAllResearchFields()

  return (
    <PageFrame>
      <Flex direction="column" gap="2">
        <Flex justify="between">
          <Heading>Recruitment Round: {round}</Heading>
          <HomepageLinkButton />
        </Flex>
        <ApplicationTable applications={applications} allResearchFields={allResearchFields} />
      </Flex>
    </PageFrame>
  )
}
