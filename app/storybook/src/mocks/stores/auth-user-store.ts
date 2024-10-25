import type { User } from '@echo/auth/types/user'
import { getUserDocumentDataMockByUsername } from '@echo/firestore/mocks/db-model/user/get-user-document-data-mock-by-username'
import type { Username } from '@echo/model/types/username'
import type { Nullable } from '@echo/utils/types/nullable'
import { assoc } from 'ramda'
import { create } from 'zustand'

interface AuthUserStore {
  user: Nullable<User>
  signIn: (username: Username) => void
  signOut: () => void
}

export const authUserStore = create<AuthUserStore>((set) => ({
  user: undefined,
  signIn: (username: Username) => {
    set(assoc('user', getUserDocumentDataMockByUsername(username)))
  },
  signOut: () => {
    set(assoc('user', undefined))
  }
}))
