import { Theme } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'
import classNames from 'classnames'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Academic Recruitment',
  description: 'A platform for managing academic recruitment at DoC, Imperial College London'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={classNames(inter.className)}>
        <Theme>{children}</Theme>
      </body>
    </html>
  )
}
