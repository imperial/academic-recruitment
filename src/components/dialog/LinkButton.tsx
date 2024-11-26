'use client'

import { HomeIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React, { FC } from 'react'

interface LinkButtonProps {
  destination: string
  children: React.ReactNode
}

const LinkButton: FC<LinkButtonProps> = ({ destination, children }) => {
  return (
    <Link href={destination} color="blue">
      <Button>{children}</Button>
    </Link>
  )
}

export const HomepageLinkButton: FC = () => {
  return (
    <LinkButton destination="/">
      <HomeIcon />
    </LinkButton>
  )
}
