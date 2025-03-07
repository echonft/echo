'use client'
import { DependenciesProvider } from '@echo/ui/components/providers/dependencies-provider'
import { dependencies } from '@echo/ui/constants/dependencies'
import { SessionProvider } from 'next-auth/react'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const Dependencies: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <DependenciesProvider dependencies={dependencies}>
      <SessionProvider>{children}</SessionProvider>
    </DependenciesProvider>
  )
}
