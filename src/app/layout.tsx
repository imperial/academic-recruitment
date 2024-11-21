import type { Metadata } from 'next'

import './globals.css'

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
      <body className="antialiased">{children}</body>
    </html>
  )
}
