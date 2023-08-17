import { DiscordGuildDocumentData } from './discord-guild-document-data'
import { WalletDocumentData } from './wallet-document-data'

export interface UserDocumentData {
  id: string
  discordAvatar: string | undefined
  discordBanner: string | undefined
  discordGuilds: DiscordGuildDocumentData[]
  discordId: string
  discordUsername: string
  nonce: string | undefined
  updatedAt: number | undefined
  wallets: WalletDocumentData[]
}
