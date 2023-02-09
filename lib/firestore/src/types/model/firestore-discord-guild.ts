import { DocumentData } from 'firebase/firestore'
export interface FirestoreDiscordGuild extends DocumentData {
  discordId: string
  contractAddresses: string[]
  channelId: string
  name: string
}
