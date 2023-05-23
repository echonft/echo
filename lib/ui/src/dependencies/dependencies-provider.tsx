import { LinkProvider, RouteParams, Routes } from './link-provider'
import { isNil } from 'ramda'
import { createContext, FunctionComponent, PropsWithChildren, useContext } from 'react'

export interface Dependencies {
  linkProvider: LinkProvider
}

const dependenciesContext = createContext<Dependencies | null>(null)

export const DependenciesProvider: FunctionComponent<PropsWithChildren<Dependencies>> = ({
  linkProvider,
  children
}) => {
  return <dependenciesContext.Provider value={{ linkProvider }}>{children}</dependenciesContext.Provider>
}

export const useLink = (route: Routes, params?: RouteParams): string => {
  const contextValue = useContext(dependenciesContext)
  if (isNil(contextValue)) {
    throw new Error('useLink must be used within DependenciesProvider')
  }

  const { linkProvider } = contextValue
  if (isNil(linkProvider)) {
    throw new Error('LinkProvider was not defined')
  }
  return linkProvider.getLink(route, params)
}
