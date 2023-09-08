import { assertUser } from '../helpers/user/assert-user'
import { Id, User, UserDetails, Wallet } from '@echo/firestore-types'
import { assoc, pick, pipe } from 'ramda'

export function mapUserToUserDetails(user: Partial<User>, wallet: Wallet): Partial<UserDetails> & Id {
  assertUser(user)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return pipe(
    pick(['id', 'discordAvatar', 'discordBanner', 'discordId', 'discordUsername']),
    assoc('wallet', wallet)
  )(user)
}
