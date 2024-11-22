'use client'

import Dropdown from '@/components/Dropdown'
import FormWrapper from '@/components/dialog/FormWrapper'
import GenericDialog from '@/components/dialog/GenericDialog'
import { addAcademicField } from '@/lib/forms'
import { ResearchField } from '@prisma/client'
import { Button, Flex, Text } from '@radix-ui/themes'
import { FC, useState } from 'react'

interface AcademicFieldDialogProps {
  applicationId: number
  allResearchFields: ResearchField[]
  applicationResearchFields: string[]
}

const AcademicFieldDialog: FC<AcademicFieldDialogProps> = ({
  applicationId,
  allResearchFields,
  applicationResearchFields
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const handleFormSuccess = () => setIsOpen(false)
  const [newField, setNewField] = useState<string>(allResearchFields[0].name)

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
        <Flex direction="column" gap="3">
          <Text>Current Fields:</Text>
          {applicationResearchFields.map((field) => (
            <Text key={field} weight="medium">
              {field}
            </Text>
          ))}
          <Flex align="center" gap="2">
            <Text>Add Field: </Text>
            <Dropdown
              choices={allResearchFields.map((field) => field.name)}
              currentChoice={newField}
              onChoiceChange={setNewField}
            />
            <input
              name="researchFieldId"
              type="hidden"
              value={allResearchFields.find((field) => field.name === newField)?.id}
            />
            <input name="applicationId" type="hidden" value={applicationId} />
          </Flex>
        </Flex>
      </FormWrapper>
    </GenericDialog>
  )
}

export default AcademicFieldDialog
