'use client'
import { ApiProvider } from '../types/provider/api-provider'
import { dependenciesContext } from './dependencies-context'
import { FunctionComponent, PropsWithChildren } from 'react'

export interface Dependencies {
  apiProvider: ApiProvider
}

export const DependenciesProvider: FunctionComponent<PropsWithChildren<Dependencies>> = ({ apiProvider, children }) => {
  return <dependenciesContext.Provider value={{ apiProvider }}>{children}</dependenciesContext.Provider>
}
