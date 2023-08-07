import { discordGuildFirestoreData, FirestoreDiscordGuildData, FirestoreDiscordGuildPrototype } from '@echo/firestore'

export const mockAddDiscordGuildAndContracts = (
  _discordGuildPrototype: FirestoreDiscordGuildPrototype
): Promise<FirestoreDiscordGuildData> => {
  return Promise.resolve(discordGuildFirestoreData['ncUnbpFfVCofV9bD7ctn']!)
}
