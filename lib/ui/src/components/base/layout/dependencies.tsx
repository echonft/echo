'use client'
import { DependenciesProvider } from '@echo/ui/components/providers/dependencies-provider'
import { dependencies } from '@echo/ui/stores/dependencies'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const Dependencies: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <DependenciesProvider dependencies={dependencies}>{children}</DependenciesProvider>
}
