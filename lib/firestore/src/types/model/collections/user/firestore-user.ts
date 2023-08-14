import { FirestoreDiscordGuild } from '../discord-guild/firestore-discord-guild'
import { FirestoreWallet } from './firestore-wallet'
import { DocumentData, DocumentReference } from '@google-cloud/firestore'

export interface FirestoreUser extends DocumentData {
  discordAvatar?: string
  discordBanner?: string
  discordGuilds?: DocumentReference<FirestoreDiscordGuild>[]
  discordId: string
  discordUsername: string
  updatedAt?: number
  wallets?: FirestoreWallet[]
}
