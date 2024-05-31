import { getUserDocumentDataMockByUsername } from '@echo/firestore-mocks/user/get-user-document-data-mock-by-username'
import type { Nullable } from '@echo/utils/types/nullable'
import type { User } from 'next-auth'
import { assoc } from 'ramda'
import { create } from 'zustand'

interface AuthUserStore {
  user: Nullable<User>
  signIn: (username: string) => void
  signOut: () => void
}

export const authUserStore = create<AuthUserStore>((set) => ({
  user: undefined,
  signIn: (username: string) => {
    set(assoc('user', getUserDocumentDataMockByUsername(username)))
  },
  signOut: () => {
    set(assoc('user', undefined))
  }
}))
