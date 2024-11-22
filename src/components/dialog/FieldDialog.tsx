'use client'

import FormWrapper, { FormPassbackState } from '@/components/dialog/FormWrapper'
import GenericDialog from '@/components/dialog/GenericDialog'
import { Button, Flex } from '@radix-ui/themes'
import { useState } from 'react'

async function addAcademicField(prevState: FormPassbackState, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 500))
  console.log(prevState, formData)
  return { status: 'success', message: 'Academic field added successfully.' }
}

const FieldDialog = () => {
  const [isOpen, setIsOpen] = useState(false)
  const handleFormSuccess = () => setIsOpen(false)

  return (
    <GenericDialog
      title="Academic Field"
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      trigger={
        <Button className="min-h-10" color="cyan">
          Edit Fields
        </Button>
      }
    >
      <FormWrapper action={addAcademicField} onSuccess={handleFormSuccess}>
        <Flex>Enter field:</Flex>
      </FormWrapper>
    </GenericDialog>
  )
}

export default FieldDialog
