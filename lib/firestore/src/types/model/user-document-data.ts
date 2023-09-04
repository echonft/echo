import { UserDiscordGuildDocumentData } from './user-discord-guild-document-data'
import { WalletDocumentData } from './wallet-document-data'

export interface UserDocumentData {
  id: string
  discordAvatar?: string
  discordBanner?: string
  discordGuilds: UserDiscordGuildDocumentData[]
  discordId: string
  discordUsername: string
  nftsUpdatedAt: number
  nonce?: string
  updatedAt: number
  wallets: WalletDocumentData[]
}
