import { BadRequestError } from '../error/bad-request-error'
import { User, Wallet } from '@echo/firestore-types'
import { isEmpty } from 'ramda'

export function assertUserHasWallets(user: User): asserts user is User & { wallets: Wallet[] } {
  if (isEmpty(user.wallets)) {
    throw new BadRequestError(`user with id ${user.id} does not have any wallet`)
  }
}
