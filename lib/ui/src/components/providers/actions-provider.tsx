'use client'
import type { Chain } from '@echo/model/constants/chain'
import { WalletStatus } from '@echo/model/constants/wallet-status'
import type { Address } from '@echo/model/types/address'
import type { Contract } from '@echo/model/types/contract'
import type { SearchResult } from '@echo/model/types/search-result'
import type { Slug } from '@echo/model/types/slug'
import type { Username } from '@echo/model/types/username'
import type { Nullable } from '@echo/utils/types/nullable'
import { createContext, type FunctionComponent, type PropsWithChildren } from 'react'
import { create, type StoreApi } from 'zustand'

// TODO move server actions to their own packaege so that we don't have to redefine the types every time here
export interface Actions {
  addWallet: (args: { address: Address; chain: Chain; message: string; signature: string }) => Promise<void>
  getWalletStatus: (wallet: Contract) => Promise<
    | {
        status: WalletStatus.NeedsSignature
        nonce: string
      }
    | {
        status: Exclude<WalletStatus, WalletStatus.NeedsSignature>
      }
  >
  searchCollections: (query: string) => Promise<SearchResult<Slug>[]>
  searchUsers: (query: string) => Promise<SearchResult<Username>[]>
}

interface Props {
  actions: Actions
}

export const actionsStoreContext = createContext<Nullable<StoreApi<Actions>>>(undefined)

export const ActionsProvider: FunctionComponent<PropsWithChildren<Props>> = ({ actions, children }) => {
  const store = create<Actions>()(() => actions)
  return <actionsStoreContext.Provider value={store}>{children}</actionsStoreContext.Provider>
}
