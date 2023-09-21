import { WalletData } from '@echo/firestore/types/model/wallet/wallet-data'

export interface FirestoreUserDetails {
  discordAvatar?: string
  discordBanner?: string
  discordId: string
  discordUsername: string
  username: string
  wallet: WalletData
}
