'use client'

import Dropdown from '@/components/Dropdown'
import FormWrapper from '@/components/dialog/FormWrapper'
import GenericDialog from '@/components/dialog/GenericDialog'
import { addComment } from '@/lib/forms'
import { prettifyCapitalisedEnumValue } from '@/lib/utils'
import { CommentType, Rating } from '@prisma/client'
import { Pencil2Icon } from '@radix-ui/react-icons'
import { Box, Button, Tabs, TextArea } from '@radix-ui/themes'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'

interface CommentDialogProps {
  applicationId: number
}

export interface CommentForm {
  applicationId: number
  text: string
  commentType: CommentType
  rating: Rating
}

const CommentDialog: FC<CommentDialogProps> = ({ applicationId }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [commentType, setCommentType] = useState<CommentType>(CommentType.GENERAL)
  const [rating, setRating] = useState<Rating>(Rating.MAYBE)

  const { register } = useForm<CommentForm>()

  return (
    <GenericDialog
      title="Comments"
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      trigger={
        <Button className="min-h-10" color="cyan">
          Edit Comments
        </Button>
      }
    >
      <Box>
        <Tabs.Root
          defaultValue="General"
          onValueChange={(tabName) => setCommentType(tabName as CommentType)}
        >
          <Tabs.List>
            <Tabs.Trigger value="GENERAL">General</Tabs.Trigger>
            <Tabs.Trigger value="FOLLOWING_TALK">Talks</Tabs.Trigger>
            <Tabs.Trigger value="INDIVIDUAL">One-to-One</Tabs.Trigger>
          </Tabs.List>

          <Box pt="3">
            <Tabs.Content value="GENERAL">General</Tabs.Content>
            <Tabs.Content value="FOLLOWING_TALK">Talks</Tabs.Content>
            <Tabs.Content value="INDIVIDUAL">One-to-One</Tabs.Content>
          </Box>
        </Tabs.Root>
      </Box>

      <Dropdown
        choices={Object.keys(Rating)}
        currentChoice={rating}
        onChoiceChange={(value) => setRating(value as Rating)}
        valueFormatter={prettifyCapitalisedEnumValue}
      />
      <FormWrapper
        submitButtonText="Add comment"
        submitIcon={<Pencil2Icon />}
        action={async (_prevState, formData) => {
          return addComment(formData)
        }}
      >
        <input type="hidden" {...register('applicationId')} value={applicationId} />
        <input type="hidden" {...register('commentType')} value={commentType.toUpperCase()} />
        <input type="hidden" {...register('rating')} value={rating.toUpperCase()} />
        <TextArea {...register('text')} placeholder="Leave a comment about the candidate here..." />
      </FormWrapper>
    </GenericDialog>
  )
}

export default CommentDialog
