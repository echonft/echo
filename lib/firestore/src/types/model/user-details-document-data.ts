import { WalletDocumentData } from './wallet-document-data'

export interface UserDetailsDocumentData {
  id: string
  discordAvatar: string | undefined
  discordBanner: string | undefined
  discordId: string
  discordUsername: string
  wallet: WalletDocumentData
}
