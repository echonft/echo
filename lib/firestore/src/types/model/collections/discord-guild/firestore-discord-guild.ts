import { FirestoreContract } from '../contract/firestore-contract'
import { DocumentData, DocumentReference } from 'firebase/firestore'

export interface FirestoreDiscordGuild extends DocumentData {
  discordId: string
  contracts: DocumentReference<FirestoreContract>[]
  channelId: string
  name: string
}
