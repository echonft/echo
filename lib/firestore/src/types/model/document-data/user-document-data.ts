import { DiscordGuildDocumentData } from './discord-guild-document-data'
import { WalletDocumentData } from './wallet-document-data'
import { DocumentData, DocumentReference } from 'firebase-admin/firestore'

export interface UserDocumentData extends DocumentData {
  discordAvatar?: string
  discordBanner?: string
  discordGuilds?: DocumentReference<DiscordGuildDocumentData>[]
  discordId: string
  discordUsername: string
  updatedAt?: number
  wallets?: WalletDocumentData[]
}
