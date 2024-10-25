import type { User } from '@echo/auth/types/user'
import { userMocks } from '@echo/model/mocks/user-mock'
import type { Username } from '@echo/model/types/username'
import type { Nullable } from '@echo/utils/types/nullable'
import { assoc, find, propEq } from 'ramda'
import { create } from 'zustand'

interface AuthUserStore {
  user: Nullable<User>
  signIn: (username: Username) => void
  signOut: () => void
}

function getUserByUsername(username: Username) {
  return find(propEq(username, 'username'), userMocks)
}
export const authUserStore = create<AuthUserStore>((set) => ({
  user: undefined,
  signIn: (username: Username) => {
    set(assoc('user', getUserByUsername(username)))
  },
  signOut: () => {
    set(assoc('user', undefined))
  }
}))
