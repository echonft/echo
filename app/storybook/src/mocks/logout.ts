import { authUserStore } from '@echo/storybook/mocks/stores/auth-user-store'
import { toPromise } from '@echo/utils/helpers/to-promise'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import { pipe } from 'ramda'

export function logout(): Promise<undefined> {
  setTimeout(() => {
    authUserStore.getState().signOut()
  }, 780)
  return pipe(toPromise, delayPromise(800))(undefined)
}
