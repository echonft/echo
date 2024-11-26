import { userMocks } from '@echo/model/mocks/user-mock'
import type { User } from '@echo/model/types/user'
import type { Nullable } from '@echo/utils/types/nullable'
import { assoc, find, propEq } from 'ramda'
import { create } from 'zustand'

interface AuthUserStore {
  user: Nullable<User>
  signIn: (username: string) => void
  signOut: () => void
}

function getUserByUsername(username: string) {
  return find(propEq(username, 'username'), userMocks)
}

export const authUserStore = create<AuthUserStore>((set) => ({
  user: undefined,
  signIn: (username: string) => {
    set(assoc('user', getUserByUsername(username)))
  },
  signOut: () => {
    set(assoc('user', undefined))
  }
}))
