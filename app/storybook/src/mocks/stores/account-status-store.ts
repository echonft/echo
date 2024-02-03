import type { AccountStatus } from '@echo/web3/types/account-status'
import { assoc } from 'ramda'
import { create } from 'zustand'

interface AccountStatusStore {
  status: AccountStatus
  connect: () => void
  disconnect: () => void
  setConnected: () => void
}
export const accountStatusStore = create<AccountStatusStore>((set) => ({
  status: 'disconnected',
  connect: () => {
    set(assoc('status', 'connecting'))
    setTimeout(() => {
      set(assoc('status', 'connected'))
    }, 800)
  },
  disconnect: () => {
    set(assoc('status', 'disconnected'))
  },
  setConnected: () => {
    set(assoc('status', 'connected'))
  }
}))
