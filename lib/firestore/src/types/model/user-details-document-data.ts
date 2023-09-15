import { WalletData } from '@echo/firestore/types/model/wallet-data'

export interface UserDetailsDocumentData {
  discordAvatar?: string
  discordBanner?: string
  discordId: string
  discordUsername: string
  username: string
  wallet: WalletData
}
