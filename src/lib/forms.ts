'use server'

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
