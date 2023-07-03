import { FirestoreContract } from '../contract/firestore-contract'
import { DocumentData, DocumentReference } from 'firebase/firestore'

export interface FirestoreDiscordGuild extends DocumentData {
  channelId: string
  contracts: DocumentReference<FirestoreContract>[]
  discordId: string
  name: string
}
