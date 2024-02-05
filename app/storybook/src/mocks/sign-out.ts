import { authUserStore } from '@echo/storybook/mocks/stores/auth-user-store'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import type { SignOutParams } from 'next-auth/react'

export function signOut(_options: SignOutParams<true> | undefined): Promise<undefined> {
  setTimeout(() => {
    authUserStore.getState().signOut()
  }, 780)
  return delayPromise(Promise.resolve(undefined), 800)
}
