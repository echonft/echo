import { AccountStatus } from '@echo/web3-dom/constants/account-status'
import { assoc } from 'ramda'
import { create } from 'zustand'

interface AccountStatusStore {
  status: AccountStatus
  connect: () => void
  disconnect: () => void
  setConnected: () => void
}

export const accountStatusStore = create<AccountStatusStore>((set) => ({
  status: AccountStatus.Disconnected,
  connect: () => {
    set(assoc('status', AccountStatus.Connecting))
    setTimeout(() => {
      set(assoc('status', AccountStatus.Connected))
    }, 800)
  },
  disconnect: () => {
    set(assoc('status', AccountStatus.Disconnected))
  },
  setConnected: () => {
    set(assoc('status', AccountStatus.Connected))
  }
}))
