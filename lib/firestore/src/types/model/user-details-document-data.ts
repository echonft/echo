import { WalletDocumentData } from './wallet-document-data'

export interface UserDetailsDocumentData {
  id: string
  discordAvatar?: string
  discordBanner?: string
  discordId: string
  discordUsername: string
  username: string
  wallet: WalletDocumentData
}
