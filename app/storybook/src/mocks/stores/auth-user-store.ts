import type { AuthUser } from '@echo/model/types/auth-user'
import { getAuthUserMockByUsername } from '@echo/model-mocks/auth-user/auth-user-mock'
import type { Nullable } from '@echo/utils/types/nullable'
import { assoc } from 'ramda'
import { create } from 'zustand'

interface AuthUserStore {
  user: Nullable<AuthUser>
  signIn: (username: string) => void
  signOut: () => void
}
export const authUserStore = create<AuthUserStore>((set) => ({
  user: undefined,
  signIn: (username: string) => {
    set(assoc('user', getAuthUserMockByUsername(username)))
  },
  signOut: () => {
    set(assoc('user', undefined))
  }
}))
