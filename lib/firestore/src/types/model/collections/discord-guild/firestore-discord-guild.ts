import { FirestoreContract } from '../contract/firestore-contract'
import { DocumentData, DocumentReference } from '@google-cloud/firestore'

export interface FirestoreDiscordGuild extends DocumentData {
  channelId: string
  contracts: DocumentReference<FirestoreContract>[]
  discordId: string
  name: string
}
