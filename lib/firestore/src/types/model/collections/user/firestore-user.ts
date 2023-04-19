import { FirestoreDiscordGuild } from '../discord-guild/firestore-discord-guild'
import { FirestoreWallet } from './firestore-wallet'
import { DocumentData, DocumentReference } from 'firebase/firestore'

export interface FirestoreUser extends DocumentData {
  discordId: string
  discordUsername: string
  discordGuilds?: DocumentReference<FirestoreDiscordGuild>[]
  discordAvatar?: string
  discordBanner?: string
  wallets?: FirestoreWallet[]
}
