import { FirestoreContract } from '../contract/firestore-contract'
import { FirestoreDiscordGuild } from '../discord-guild/firestore-discord-guild'
import { DocumentData, DocumentReference } from 'firebase/firestore'

export interface FirestoreNftCollection extends DocumentData {
  bannerUrl?: string
  contract: DocumentReference<FirestoreContract>
  description: string
  discordUrl?: string
  discordGuild: DocumentReference<FirestoreDiscordGuild>
  floorPrice?: number
  name: string
  profilePictureUrl?: string
  totalSupply?: number
  twitterUsername?: string
  websiteUrl?: string
}
