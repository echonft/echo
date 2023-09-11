import { assertUser } from '../helpers/user/assert-user'
import { Id, User, UserDetails, Wallet } from '@echo/firestore-types'
import { assoc, pick, pipe } from 'ramda'

export function mapUserToUserDetails(user: Partial<User>, wallet: Wallet): Partial<UserDetails> & Id {
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
