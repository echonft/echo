'use client'
import type { Dependencies } from '@echo/ui/types/dependencies'
import { isNil } from 'ramda'
import React, { type PropsWithChildren } from 'react'

const dependenciesContext = React.createContext<Dependencies | undefined>(undefined)

export const DependenciesProvider: React.FunctionComponent<PropsWithChildren<Record<'dependencies', Dependencies>>> = ({
  children,
  ...dependencies
}) => {
  return <dependenciesContext.Provider value={dependencies.dependencies}>{children}</dependenciesContext.Provider>
}

export function useDependencies(): Dependencies {
  const dependencies = React.useContext(dependenciesContext)
  if (isNil(dependencies)) {
    throw new Error('useDependencies must be used within DependenciesProvider')
  }
  return dependencies
}
