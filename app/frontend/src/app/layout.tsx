import '@echo/ui/dist/index.css'
import '../index.css'
import type { Metadata } from 'next'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const metadata: Metadata = {
  title: 'Echo',
  description: 'Echo',
  applicationName: 'Echo',
  viewport: {
    width: 'device-width',
    initialScale: 1
  },
  other: {
    charset: 'utf-8'
  }
}

const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

export default Layout
