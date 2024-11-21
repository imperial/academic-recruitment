import PageFrame from '@/components/PageFrame'
import RoundEntry from '@/components/RoundEntry'
import { Flex, Heading } from '@radix-ui/themes'

export default function Home() {
  return (
    <PageFrame>
      <Flex direction="column">
        <Heading>Academic Recruitment</Heading>
        <RoundEntry />
      </Flex>
    </PageFrame>
  )
}
