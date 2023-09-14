import type { WalletDocumentData } from '@echo/firestore/types/model/wallet-document-data'

export interface UserDetailsDocumentData {
  id: string
  discordAvatar?: string
  discordBanner?: string
  discordId: string
  discordUsername: string
  username: string
  wallet: WalletDocumentData
}
