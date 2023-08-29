import { LinkProvider } from '../../types/provider/link-provider'
import { dependenciesContext } from '../dependencies-context'
import { isNil } from 'ramda'
import { useContext } from 'react'

export const useLinks = (): LinkProvider => {
  const contextValue = useContext(dependenciesContext)
  if (isNil(contextValue)) {
    throw new Error('useLinks must be used within DependenciesProvider')
  }
  const { linkProvider } = contextValue
  if (isNil(linkProvider)) {
    throw new Error('LinkProvider is not defined')
  }
  return linkProvider
}
