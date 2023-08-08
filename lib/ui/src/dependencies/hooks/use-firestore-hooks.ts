import { FirestoreHooks } from '../../types/provider/firestore-hooks'
import { dependenciesContext } from '../dependencies-context'
import { isNil } from 'ramda'
import { useContext } from 'react'

export const useFirestoreHooks = (): FirestoreHooks => {
  const contextValue = useContext(dependenciesContext)
  if (isNil(contextValue)) {
    throw new Error('useFirestoreHooks must be used within DependenciesProvider')
  }
  const { firestoreProvider } = contextValue
  if (isNil(firestoreProvider)) {
    throw new Error('FirestoreProvider was not defined')
  }
  return firestoreProvider.hooks
}
