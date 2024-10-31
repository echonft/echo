'use client'
import type { GetWalletStatusArgs, GetWalletStatusReturn } from '@echo/backend/actions/get-wallet-status'
import type { Nullable } from '@echo/utils/types/nullable'
import { createContext, type FunctionComponent, type PropsWithChildren } from 'react'
import { create, type StoreApi } from 'zustand'

interface Actions {
  getWalletStatus: (args: GetWalletStatusArgs) => Promise<GetWalletStatusReturn>
}

interface Props {
  actions: Actions
}

export const actionsStoreContext = createContext<Nullable<StoreApi<Actions>>>(undefined)

export const ActionsProvider: FunctionComponent<PropsWithChildren<Props>> = ({ actions, children }) => {
  const store = create<Actions>()(() => actions)
  return <actionsStoreContext.Provider value={store}>{children}</actionsStoreContext.Provider>
}
