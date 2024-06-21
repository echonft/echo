import { authUserStore } from '@echo/storybook/mocks/stores/auth-user-store'
import { delayPromise } from '@echo/utils/helpers/delay-promise'

export function signOut(): Promise<void> {
  setTimeout(() => {
    authUserStore.getState().signOut()
  }, 780)
  return delayPromise(() => Promise.resolve(), 800)()
}
