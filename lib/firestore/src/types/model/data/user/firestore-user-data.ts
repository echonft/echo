import { FirestoreRootCollectionDocumentData } from '../abstract/firestore-root-collection-document-data'
import { FirestoreDiscordGuildData } from '../discord-guild/firestore-discord-guild-data'
import { FirestoreWalletData } from './firestore-wallet-data'

export interface FirestoreUserData extends FirestoreRootCollectionDocumentData {
  id: string
  discordAvatar?: string
  discordBanner?: string
  discordGuilds?: FirestoreDiscordGuildData[]
  discordId: string
  discordUsername: string
  updatedAt?: number
  wallets: FirestoreWalletData[]
}
