'use client'
import { ApiProvider } from '../types/provider/api-provider'
import { LinkProvider } from '../types/provider/link-provider'
import { dependenciesContext } from './dependencies-context'
import { FunctionComponent, PropsWithChildren } from 'react'

export interface Dependencies {
  apiProvider: ApiProvider
  linkProvider: LinkProvider
}

export const DependenciesProvider: FunctionComponent<PropsWithChildren<Dependencies>> = ({
  linkProvider,
  apiProvider,
  children
}) => {
  return (
    <dependenciesContext.Provider value={{ linkProvider, apiProvider: apiProvider }}>
      {children}
    </dependenciesContext.Provider>
  )
}
