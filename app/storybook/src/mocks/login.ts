import { userMockJohnnyUsername } from '@echo/model/mocks/user/user-mock'
import { authUserStore } from '@echo/storybook/mocks/stores/auth-user-store'
import { toPromise } from '@echo/utils/fp/to-promise'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import { pipe } from 'ramda'

export function login(): Promise<undefined> {
  setTimeout(() => {
    authUserStore.getState().signIn(userMockJohnnyUsername())
  }, 780)
  return pipe(toPromise, delayPromise(800))(undefined)
}
