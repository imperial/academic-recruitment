import { Select } from '@radix-ui/themes'
import React, { FC } from 'react'

interface DropdownProps {
  choices: string[]
  currentChoice?: string
  onChoiceChange?: (value: string) => void
}

const Dropdown: FC<DropdownProps> = ({ choices, currentChoice, onChoiceChange }) => {
  return (
    <Select.Root onValueChange={onChoiceChange} value={currentChoice}>
      <Select.Trigger />
      <Select.Content>
        {choices.map((value) => (
          <Select.Item key={value} value={value}>
            {value}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}

export default Dropdown
