import { User } from '../types/model/user'
import { UserDetails } from '../types/model/user-details'
import { Wallet } from '../types/model/wallet'
import { assoc, includes, omit, pipe } from 'ramda'

export const mapUserToUserDetails = (user: User, wallet: Wallet): UserDetails => {
  if (!includes(wallet, user.wallets)) {
    throw Error('user does not own wallet')
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return pipe(omit(['discordGuilds', 'nonce', 'nftsUpdatedAt', 'updatedAt', 'wallets']), assoc('wallet', wallet))(user)
}
