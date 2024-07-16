import { authUserStore } from '@echo/storybook/mocks/stores/auth-user-store'
import { delayPromise } from '@echo/utils/helpers/delay-promise'

export function logout(): Promise<undefined> {
  setTimeout(() => {
    authUserStore.getState().signOut()
  }, 780)
  return delayPromise(() => Promise.resolve(undefined), 800)()
}
