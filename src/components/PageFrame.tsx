import { Container, Section } from '@radix-ui/themes'
import { FC, ReactNode } from 'react'

interface PageFrameProps {
  children: ReactNode
}

const PageFrame: FC<PageFrameProps> = ({ children }) => {
  return (
    <Section>
      <Container>{children}</Container>
    </Section>
  )
}

export default PageFrame
