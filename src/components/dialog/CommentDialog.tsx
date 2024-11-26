'use client'

import Dropdown from '@/components/Dropdown'
import CommentItem from '@/components/dialog/CommentItem'
import FormWrapper from '@/components/dialog/FormWrapper'
import GenericDialog from '@/components/dialog/GenericDialog'
import { addComment } from '@/lib/forms'
import { prettifyCapitalisedEnumValue } from '@/lib/utils'
import { Comment, CommentType, Rating } from '@prisma/client'
import { Pencil2Icon } from '@radix-ui/react-icons'
import { Box, Flex, Separator, Tabs, Text, TextArea } from '@radix-ui/themes'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'

interface CommentDialogProps {
  applicationId: number
  comments: Comment[]
}

export interface CommentForm {
  applicationId: number
  text: string
  commentType: CommentType
  rating: Rating
}

const CommentDialog: FC<CommentDialogProps> = ({ applicationId, comments }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [commentType, setCommentType] = useState<CommentType>(CommentType.GENERAL)
  const [rating, setRating] = useState<Rating>(Rating.MAYBE)

  const { register } = useForm<CommentForm>()
  const generalComments = comments.filter((comment) => comment.commentType === CommentType.GENERAL)
  const followingTalkComments = comments.filter(
    (comment) => comment.commentType === CommentType.FOLLOWING_TALK
  )
  const individualComments = comments.filter(
    (comment) => comment.commentType === CommentType.INDIVIDUAL
  )

  return (
    <GenericDialog
      title="Comments"
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      triggerColor="gray"
      triggerText="Comments"
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
            <Tabs.Content value="GENERAL">
              {generalComments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))}
            </Tabs.Content>
            <Tabs.Content value="FOLLOWING_TALK">
              {followingTalkComments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))}
            </Tabs.Content>
            <Tabs.Content value="INDIVIDUAL">
              {individualComments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))}
            </Tabs.Content>
          </Box>
        </Tabs.Root>
      </Box>

      <Separator size="4" className="my-3 border-4" />

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
        <Flex align="center" gap="2" className="my-2">
          <Text>Rating:</Text>
          <Dropdown
            choices={Object.keys(Rating)}
            currentChoice={rating}
            onChoiceChange={(value) => setRating(value as Rating)}
            valueFormatter={prettifyCapitalisedEnumValue}
          />
        </Flex>
      </FormWrapper>
    </GenericDialog>
  )
}

export default CommentDialog
