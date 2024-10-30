import type { Awaitable } from '@echo/utils/types/awaitable'
import type { HexString } from '@echo/utils/types/hex-string'
import type { Nullable } from '@echo/utils/types/nullable'
import { AccountStatus } from '@echo/web3-dom/constants/account-status'
import { type AccountResult } from '@echo/web3-dom/services/get-account'
import { create } from 'zustand'

export interface NonceData {
  message: string
  nonce: string
  signature: HexString
}

export interface WalletStoreApi {
  account: AccountResult
  nonce: Nullable<NonceData>
  setNonceData: (nonce: NonceData) => void
  clearNonceData: () => void
}

export interface CreateWalletStoreArgs {
  getAccount: () => AccountResult
  watchAccount: (onChange: (account: AccountResult, prevAccount: AccountResult) => void) => void
  onConnect?: () => Awaitable<void>
  onDisonnect?: () => Awaitable<void>
  onUnsupportedChain?: () => Awaitable<void>
}

export function createWalletStore({
  getAccount,
  watchAccount,
  onConnect,
  onDisonnect,
  onUnsupportedChain
}: CreateWalletStoreArgs) {
  return create<WalletStoreApi>((set) => {
    watchAccount((account, prevAccount) => {
      set({ account })
      if (account.status === AccountStatus.UnsupportedChain && prevAccount.status !== AccountStatus.UnsupportedChain) {
        onUnsupportedChain?.()
      }
      if (account.status === AccountStatus.Connected && prevAccount.status !== AccountStatus.Connected) {
        onConnect?.()
      }
      if (account.status === AccountStatus.Disconnected && prevAccount.status !== AccountStatus.Disconnected) {
        onDisonnect?.()
      }
    })
    return {
      account: getAccount(),
      nonce: undefined,
      setNonceData(nonce: NonceData) {
        set({ nonce })
      },
      clearNonceData() {
        set({ nonce: undefined })
      }
    }
  })
}
