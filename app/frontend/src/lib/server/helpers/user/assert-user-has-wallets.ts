import type { FirestoreDiscordUser } from '@echo/firestore/types/model/firestore-discord-user'
import type { FirestoreWallet } from '@echo/firestore/types/model/firestore-wallet'
import { BadRequestError } from '@server/helpers/error/bad-request-error'
import { isEmpty } from 'ramda'

export function assertUserHasWallets(
  user: FirestoreDiscordUser
): asserts user is FirestoreDiscordUser & { wallets: FirestoreWallet[] } {
  if (isEmpty(user.wallets)) {
    throw new BadRequestError(`user with id ${user.id} does not have any wallet`)
  }
}
