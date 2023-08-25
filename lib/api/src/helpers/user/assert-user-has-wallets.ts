import { BadRequestError } from '../error/bad-request-error'
import { User } from '@echo/firestore'
import { isEmpty } from 'ramda'

export const assertUserHasWallets = (user: User) => {
  if (isEmpty(user.wallets)) {
    throw new BadRequestError()
  }
}
