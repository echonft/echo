import { ApiError } from '../api-error'
import { User } from '@echo/firestore'
import { isEmpty } from 'ramda'

export const assertUserHasWallets = (user: User) => {
  if (isEmpty(user.wallets)) {
    throw new ApiError(400, 'User does not have wallets')
  }
}
