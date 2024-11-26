'use client'

import GenericDialog from '@/components/dialog/GenericDialog'
import { Button } from '@radix-ui/themes'
import { FC, useState } from 'react'

interface CommentDialogProps {
  applicationId: number
}

const CommentDialog: FC<CommentDialogProps> = ({ applicationId }) => {
  const [isOpen, setIsOpen] = useState(false)

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
      <input name="applicationId" type="hidden" value={applicationId} />
    </GenericDialog>
  )
}

export default CommentDialog
