'use client'

import GenericDialog from '@/components/dialog/GenericDialog'
import { addComment } from '@/lib/forms'
import { createNewComment } from '@/lib/query'
import { CommentType } from '@prisma/client'
import { Button, TextArea } from '@radix-ui/themes'
import { string } from 'prop-types'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'

interface CommentDialogProps {
  applicationId: number
}

export interface CommentForm {
  applicationId: number
  text: string
  authorLogin: string
}

const CommentDialog: FC<CommentDialogProps> = ({ applicationId }) => {
  const [isOpen, setIsOpen] = useState(false)

  const { register, handleSubmit } = useForm<CommentForm>()

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
      <form
        onSubmit={handleSubmit(async (data) => {
          //await axios.post('/api/comments', data)
          //await createNewComment(data.applicationId, data.text, data.authorLogin, 'YES', 'GENERAL')
          await addComment(data)

          setIsOpen(false)
        })}
      >
        <input type="hidden" {...register('applicationId')} value={applicationId} />
        <input type="hidden" {...register('authorLogin')} value="" />

        <TextArea {...register('text')} placeholder="add comment"></TextArea>
        <Button>Add new comment</Button>
      </form>

      <input name="applicationId" type="hidden" value={applicationId} />
    </GenericDialog>
  )
}

export default CommentDialog
