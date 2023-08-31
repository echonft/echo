import { ApiHooks } from '../../types/provider/api-hooks'
import { dependenciesContext } from '../dependencies-context'
import { isNil } from 'ramda'
import { useContext } from 'react'

export const useApiHooks = (): ApiHooks => {
  const contextValue = useContext(dependenciesContext)
  if (isNil(contextValue)) {
    throw new Error('useApiHooks must be used within DependenciesProvider')
  }
  const { apiProvider } = contextValue
  if (isNil(apiProvider)) {
    throw new Error('ApiProvider is not defined')
  }
  return apiProvider.hooks
}
