import { Select } from '@radix-ui/themes'
import React, { FC } from 'react'

interface DropdownProps {
  choices: string[]
  currentChoice?: string
  onChoiceChange?: (value: string) => void
  valueFormatter?: (value: string) => string
}

const Dropdown: FC<DropdownProps> = ({
  choices,
  currentChoice,
  onChoiceChange,
  valueFormatter = (value) => value
}) => {
  return (
    <Select.Root onValueChange={onChoiceChange} value={currentChoice}>
      <Select.Trigger />
      <Select.Content>
        {choices.map((value) => (
          <Select.Item key={value} value={value}>
            {valueFormatter(value)}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}

export default Dropdown
