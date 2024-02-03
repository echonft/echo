import { assoc } from 'ramda'
import { create } from 'zustand'

interface ErrorStore {
  getNonceError: boolean
  addGetNonceError: () => void
  clearGetNonceError: () => void
  signNonceError: boolean
  addSignNonceError: () => void
  clearSignNonceError: () => void
  addWalletError: boolean
  addAddWalletError: () => void
  clearAddWalletError: () => void
}
export const errorStore = create<ErrorStore>((set) => ({
  getNonceError: false,
  addGetNonceError: () => {
    set(assoc('getNonceError', true))
  },
  clearGetNonceError: () => {
    set(assoc('getNonceError', false))
  },
  signNonceError: false,
  addSignNonceError: () => {
    set(assoc('signNonceError', true))
  },
  clearSignNonceError: () => {
    set(assoc('signNonceError', false))
  },
  addWalletError: false,
  addAddWalletError: () => {
    set(assoc('addWalletError', true))
  },
  clearAddWalletError: () => {
    set(assoc('addWalletError', false))
  }
}))
