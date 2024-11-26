'use server'

import { FormPassbackState } from '@/components/dialog/FormWrapper'
import { associateApplicationWithField, createComment } from '@/lib/query'
import { CommentType, Rating } from '@prisma/client'

export async function addAcademicField(prevState: FormPassbackState, formData: FormData) {
  const applicationId = Number(formData.get('applicationId') as unknown)
  const newField = Number(formData.get('researchFieldId') as unknown)

  await associateApplicationWithField(applicationId, newField)
  return { status: 'success', message: 'Academic field added successfully.' }
}

export async function addComment(formData: FormData) {
  const applicationId = Number(formData.get('applicationId'))
  const text = formData.get('text') as string
  const rating = formData.get('rating') as Rating
  const commentType = formData.get('commentType') as CommentType

  await createComment(applicationId, text, rating, commentType)
  return { status: 'success', message: 'Comment added successfully.' }
}
