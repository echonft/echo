import { userMockJohnnyUsername } from '@echo/model-mocks/user/user-mock'
import { authUserStore } from '@echo/storybook/mocks/stores/auth-user-store'
import { toPromise } from '@echo/utils/fp/to-promise'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import type { SignInResponse } from 'next-auth/react'

export function signIn(): Promise<SignInResponse> {
  setTimeout(() => {
    authUserStore.getState().signIn(userMockJohnnyUsername())
  }, 780)
  return delayPromise(toPromise, 800)({ error: undefined, status: 200, ok: true, url: null })
}
