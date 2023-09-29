import { mapWalletToWalletData } from '@echo/firestore/mappers/map-wallet-to-wallet-data'
import { FirestoreDiscordUser } from '@echo/firestore/types/model/discord-user/firestore-discord-user'
import { FirestoreUserDetails } from '@echo/firestore/types/model/user/firestore-user-details'
import { FirestoreWallet } from '@echo/firestore/types/model/wallet/firestore-wallet'
import { assoc, pick, pipe } from 'ramda'

export function getUserDetails(
  username: string,
  discordUser: FirestoreDiscordUser,
  wallet: FirestoreWallet
): FirestoreUserDetails {
  return pipe(
    pick(['discordAvatar', 'discordBanner', 'discordId', 'discordUsername']),
    assoc('username', username),
    assoc('wallet', mapWalletToWalletData(wallet))
  )(discordUser) as FirestoreUserDetails
}
