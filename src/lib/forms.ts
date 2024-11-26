'use server'

import { CommentForm } from '@/components/dialog/CommentDialog'
import { FormPassbackState } from '@/components/dialog/FormWrapper'
import { associateApplicationWithField } from '@/lib/query'

export async function addAcademicField(prevState: FormPassbackState, formData: FormData) {
  const applicationId = Number(formData.get('applicationId') as unknown)
  const newField = Number(formData.get('researchFieldId') as unknown)
  console.log(applicationId, newField)

  await associateApplicationWithField(applicationId, newField)
  console.log(prevState, formData)
  return { status: 'success', message: 'Academic field added successfully.' }
}

export async function addComment(formData: CommentForm) {
  //const applicationId = Number(formData.applicationId)

  console.log(formData)
}
