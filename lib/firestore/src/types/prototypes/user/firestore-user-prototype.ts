import { FirestorePrototypeData } from '../base/firestore-prototype-data'

export interface FirestoreUserPrototype extends FirestorePrototypeData {
  discordId: string
  discordUsername: string
  discordAvatar: string | undefined
  discordBanner: string | undefined
  discordGuildIds: string[]
}
