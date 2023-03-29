import { FirestoreDiscordGuild } from '../discord-guild'
import { FirestoreWallet } from './firestore-wallet'
import { DocumentData, DocumentReference } from 'firebase/firestore'

export interface FirestoreUser extends DocumentData {
  discordId: number
  discordUsername: string
  discordGuilds?: DocumentReference<FirestoreDiscordGuild>[]
  nonce?: string
  wallets?: FirestoreWallet[]
}
