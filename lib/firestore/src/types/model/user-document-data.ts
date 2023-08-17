import { DiscordGuildDocumentData } from './discord-guild-document-data'
import { WalletDocumentData } from './wallet-document-data'

export interface UserDocumentData {
  id: string
  discordAvatar?: string
  discordBanner?: string
  discordGuilds: DiscordGuildDocumentData[]
  discordId: string
  discordUsername: string
  nonce?: string
  updatedAt?: number
  wallets: WalletDocumentData[]
}
