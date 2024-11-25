'use client'

import Dropdown from '@/components/Dropdown'
import { Button, Flex, Text } from '@radix-ui/themes'
import { FC, useState } from 'react'

interface RoundEntryProps {
  allRounds: string[]
}

const RoundEntry: FC<RoundEntryProps> = ({ allRounds }) => {
  const [round, setRound] = useState<string>(allRounds ? allRounds[0] : '')

  return (
    <Flex direction="column" gap="2">
      <Text size="3">Enter the recruitment round: </Text>
      <Dropdown choices={allRounds} currentChoice={round} onChoiceChange={setRound} />
      <Button type="button" onClick={() => (window.location.href = `/applications/${round}`)}>
        View round
      </Button>
    </Flex>
  )
}

export default RoundEntry
