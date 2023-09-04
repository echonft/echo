import { User, UserDetails, Wallet } from '@echo/firestore-types'
import { assoc, includes, omit, pipe } from 'ramda'

export const mapUserToUserDetails = (user: User, wallet: Wallet): UserDetails => {
  if (!includes(wallet, user.wallets)) {
    throw Error('user does not own wallet')
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return pipe(omit(['discordGuilds', 'nonce', 'nftsUpdatedAt', 'updatedAt', 'wallets']), assoc('wallet', wallet))(user)
}
