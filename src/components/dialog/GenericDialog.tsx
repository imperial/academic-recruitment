'use client'

import { Cross2Icon } from '@radix-ui/react-icons'
import { Button, Dialog } from '@radix-ui/themes'
import React, { FC, ReactNode } from 'react'

interface GenericFormDialogProps {
  children: ReactNode
  title: string
  description?: string
  triggerText: string
  triggerColor: 'ruby' | 'cyan' | 'orange' | 'gray' | 'green' | 'blue'
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

const GenericDialog: FC<GenericFormDialogProps> = ({
  children,
  title,
  description,
  triggerText,
  triggerColor,
  isOpen,
  onOpenChange
}) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Trigger>
        <Button className="min-h-10 w-20" color={triggerColor}>
          {triggerText}
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Cross2Icon
          color="gray"
          className="w-6 h-6 absolute top-2 right-2 "
          onClick={() => onOpenChange(false)}
        />
        <Dialog.Title>{title}</Dialog.Title>
        {description && <Dialog.Description>{description}</Dialog.Description>}
        {children}
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default GenericDialog
