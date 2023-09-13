import { assertUser } from '@echo/firestore/helpers/user/assert-user'
import type { FirestoreUser } from '@echo/firestore/types/model/firestore-user'
import type { FirestoreUserDetails } from '@echo/firestore/types/model/firestore-user-details'
import type { FirestoreWallet } from '@echo/firestore/types/model/firestore-wallet'
import { assoc, pick, pipe } from 'ramda'

export function mapUserToUserDetails(
  user: Partial<FirestoreUser>,
  wallet: FirestoreWallet
): Partial<FirestoreUserDetails> {
  assertUser(user)
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return pipe(
      pick(['id', 'discordAvatar', 'discordBanner', 'discordId', 'discordUsername', 'username']),
      assoc('wallet', wallet)
    )(user)
  } catch (e) {
    throw Error(`error mapping user ${JSON.stringify(user)} wallet ${JSON.stringify(wallet)} to user details`)
  }
}
