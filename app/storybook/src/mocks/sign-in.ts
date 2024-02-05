import { authUserStore } from '@echo/storybook/mocks/stores/auth-user-store'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import type { SignInResponse } from 'next-auth/react'

export function signIn(): Promise<SignInResponse> {
  setTimeout(() => {
    authUserStore.getState().signIn('johnnycagewins')
  }, 780)
  return delayPromise(Promise.resolve({ error: undefined, status: 200, ok: true, url: null }), 800)
}
