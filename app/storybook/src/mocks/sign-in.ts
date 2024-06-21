import { userMockJohnnyUsername } from '@echo/model/mocks/user/user-mock'
import { authUserStore } from '@echo/storybook/mocks/stores/auth-user-store'
import { delayPromise } from '@echo/utils/helpers/delay-promise'

export function signIn(): Promise<void> {
  setTimeout(() => {
    authUserStore.getState().signIn(userMockJohnnyUsername())
  }, 780)
  return delayPromise(() => Promise.resolve(), 800)()
}
