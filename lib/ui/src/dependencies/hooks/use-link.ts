import { RouteParams, Routes } from '../../types/provider/link-provider'
import { dependenciesContext } from '../dependencies-context'
import { isNil } from 'ramda'
import { useContext } from 'react'

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
