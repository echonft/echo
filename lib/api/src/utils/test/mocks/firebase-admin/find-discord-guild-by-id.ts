import { idRejecter } from './id-rejecter'
import { idThrower } from './id-thrower'
import { discordGuildFirestoreData, FirestoreDiscordGuildData } from '@echo/firestore'
import { R } from '@mobily/ts-belt'
import { isNil } from 'ramda'

export const mockFindDiscordGuildById = (id: string) => {
  const discordGuild = discordGuildFirestoreData[id]
  idThrower(id)
  if (idRejecter(id)) {
    return Promise.reject(new Error('not found'))
  }
  return R.fromPromise<FirestoreDiscordGuildData>(
    isNil(discordGuild) ? Promise.reject(new Error('not found')) : Promise.resolve(discordGuild)
  )
}
