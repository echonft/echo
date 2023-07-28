import { discordGuildFirestoreData, FirestoreDiscordGuildData, FirestoreDiscordGuildPrototype } from '@echo/firestore'
import { R } from '@mobily/ts-belt'

export const mockAddDiscordGuildAndContracts = (
  _discordGuildPrototype: FirestoreDiscordGuildPrototype
): Promise<R.Result<FirestoreDiscordGuildData, Error>> => {
  return Promise.resolve(R.fromNullable(discordGuildFirestoreData['ncUnbpFfVCofV9bD7ctn'], new Error('invalid data')))
}
