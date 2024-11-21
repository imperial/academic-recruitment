'use client'

import { Button, Flex, Text, TextField } from '@radix-ui/themes'
import { FC, useState } from 'react'

const RoundEntry: FC = () => {
  const [round, setRound] = useState('')

  return (
    <Flex direction="column" gap="2">
      <Text size="3">Enter the recruitment round: </Text>
      <TextField.Root
        id="round"
        name="round"
        required
        value={round}
        onChange={(e) => setRound(e.target.value)}
      />
      <Button type="button" onClick={() => (window.location.href = `/applications/${round}`)}>
        View round
      </Button>
    </Flex>
  )
}

export default RoundEntry
