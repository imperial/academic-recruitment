'use client'

import {
  CheckCircledIcon,
  CrossCircledIcon,
  DoubleArrowRightIcon,
  UpdateIcon
} from '@radix-ui/react-icons'
import { Button, Callout, Flex, Spinner } from '@radix-ui/themes'
import React, { FC, ReactNode, useActionState, useState } from 'react'

export interface FormPassbackState {
  status: string
  message: string
}

const DEFAULT_SUBMIT_BTN_TEXT = 'Save'

interface FormInDialogProps {
  children: ReactNode
  action: (prevState: FormPassbackState, formData: FormData) => Promise<FormPassbackState>
  submitButtonText?: string
  submitIcon?: ReactNode
  onSuccess?: () => void
  // readOnly access disables save
  readOnly?: boolean
  refreshButton?: boolean
}

const FormWrapper: FC<FormInDialogProps> = ({
  children,
  action,
  submitButtonText,
  submitIcon = <DoubleArrowRightIcon />,
  onSuccess = () => {},
  readOnly = false,
  refreshButton = false
}) => {
  const [pending, setPending] = useState(false)
  const wrappedAction = async (
    prevState: FormPassbackState,
    formData: FormData
  ): Promise<FormPassbackState> => {
    const res = await action(prevState, formData)
    setPending(false)
    if (res.status === 'success') onSuccess()
    return res
  }

  const [state, formAction] = useActionState(wrappedAction, { status: '', message: '' })
  return (
    <Flex direction="column" gap="2">
      {!!state.message && (
        <Callout.Root size="1" color={state.status === 'success' ? 'green' : 'red'}>
          <Callout.Icon>
            {state.status === 'success' && <CheckCircledIcon />}
            {state.status === 'error' && <CrossCircledIcon />}
          </Callout.Icon>
          <Callout.Text>{state.message}</Callout.Text>
        </Callout.Root>
      )}

      <form action={formAction} onSubmit={() => setPending(true)}>
        {children}
        <Flex justify="end" gap="2" mt="4">
          {refreshButton && (
            <Button type="button" color="bronze" onClick={() => window.location.reload()}>
              <UpdateIcon />
              Refresh (to load changes)
            </Button>
          )}
          <Button type="submit" disabled={pending || readOnly}>
            {pending ? <Spinner /> : (submitButtonText ?? DEFAULT_SUBMIT_BTN_TEXT)}
            {submitIcon}
          </Button>
        </Flex>
      </form>
    </Flex>
  )
}

export default FormWrapper