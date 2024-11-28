import { userMockCrew } from '@echo/model/mocks/user-mock'
import type { User } from '@echo/model/types/user'
import type { Nullable } from '@echo/utils/types/nullable'
import { AccountStatus } from '@echo/web3-dom/constants/account-status'
import { assoc, pipe } from 'ramda'
import { create } from 'zustand'

interface AuthStoreApi {
  status: AccountStatus
  user: Nullable<User>
  signIn: VoidFunction
  signOut: VoidFunction
}

export const authStore = create<AuthStoreApi>((set) => ({
  status: AccountStatus.Disconnected,
  user: undefined,
  signIn: () => {
    set(pipe(assoc('user', userMockCrew), assoc('status', AccountStatus.Connected)))
  },
  signOut: () => {
    set(pipe(assoc('user', undefined), assoc('status', AccountStatus.Disconnected)))
  }
}))
