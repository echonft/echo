'use client'
import type { Actions } from '@echo/ui/types/providers/actions'
import type { Nullable } from '@echo/utils/types/nullable'
import { createContext, type FunctionComponent, type PropsWithChildren } from 'react'
import { create, type StoreApi } from 'zustand'

interface Props {
  actions: Actions
}

export const actionsStoreContext = createContext<Nullable<StoreApi<Actions>>>(undefined)

export const ActionsProvider: FunctionComponent<PropsWithChildren<Props>> = ({ actions, children }) => {
  const store = create<Actions>()(() => actions)
  return <actionsStoreContext.Provider value={store}>{children}</actionsStoreContext.Provider>
}
