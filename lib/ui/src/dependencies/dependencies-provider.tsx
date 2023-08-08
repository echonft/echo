import { FirestoreProvider } from '../types/provider/firestore-provider'
import { LinkProvider } from '../types/provider/link-provider'
import { dependenciesContext } from './dependencies-context'
import { FunctionComponent, PropsWithChildren } from 'react'

export interface Dependencies {
  firestoreProvider: FirestoreProvider
  linkProvider: LinkProvider
}

export const DependenciesProvider: FunctionComponent<PropsWithChildren<Dependencies>> = ({
  linkProvider,
  firestoreProvider,
  children
}) => {
  return (
    <dependenciesContext.Provider value={{ linkProvider, firestoreProvider }}>{children}</dependenciesContext.Provider>
  )
}
