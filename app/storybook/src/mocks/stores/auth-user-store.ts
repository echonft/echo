import type { AuthUser } from '@echo/model/types/auth-user'
import type { Wallet } from '@echo/model/types/wallet'
import { getAuthUserMockByUsername } from '@echo/model-mocks/auth-user/auth-user-mock'
import { getWalletMock } from '@echo/model-mocks/wallet/get-wallet-mock'
import type { Nullable } from '@echo/utils/types/nullable'
import { assoc } from 'ramda'
import { create } from 'zustand'

interface AuthUserStore {
  user: Nullable<AuthUser>
  wallets: Wallet[]
  signIn: (username: string) => void
  signOut: () => void
  clearWallets: () => void
  addWallets: () => void
}
export const authUserStore = create<AuthUserStore>((set) => ({
  user: undefined,
  wallets: [],
  signIn: (username: string) => {
    set(assoc('user', getAuthUserMockByUsername(username)))
  },
  signOut: () => {
    set(assoc('user', undefined))
  },
  clearWallets: () => {
    set(assoc('wallets', []))
  },
  addWallets: () => {
    set(assoc('wallets', [getWalletMock()]))
  }
}))
