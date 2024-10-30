'use client'
import { type Actions, actionsStore } from '@echo/ui/stores/actions-store'
import type { Nullable } from '@echo/utils/types/nullable'
import { createContext, type FunctionComponent, type PropsWithChildren } from 'react'
import { type StoreApi } from 'zustand'

interface Props {
  actions: Actions
}

export const actionsStoreContext = createContext<Nullable<StoreApi<Actions>>>(undefined)

export const ActionsProvider: FunctionComponent<PropsWithChildren<Props>> = ({ actions, children }) => {
  const store = actionsStore(actions)
  return <actionsStoreContext.Provider value={store}>{children}</actionsStoreContext.Provider>
}
