import { EnterIcon } from '@radix-ui/react-icons'
import { Button, Flex, Heading, Separator, Text } from '@radix-ui/themes'
import React from 'react'

import { signIn } from '../../../../auth'

const LoginPage = async () => {
  const signInEntraID = async () => {
    'use server'
    try {
      await signIn('microsoft-entra-id', { redirectTo: '/' })
    } catch (error) {
      throw error
    }
  }

  return (
    <Flex gap="6" direction="column">
      <Flex pl="9" pr="9" direction="column" gap="5">
        <Flex direction="column" justify="center" align="center" gap="1">
          <Heading as="h1">Academic Recruitment</Heading>
          <Text>Portal for academic recruitment</Text>
        </Flex>
        <Separator size="4" />
        <Flex direction="column" gap="3">
          <form action={signInEntraID}>
            <Button size="3" className="w-full">
              Login with SSO
              <EnterIcon />
            </Button>
          </form>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default LoginPage
