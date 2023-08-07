import { discordGuildFirestoreData } from '@echo/firestore'
import { idRejecter, idThrower } from '@echo/utils'
import { isNil } from 'ramda'

export const mockFindDiscordGuildById = (id: string) => {
  const discordGuild = discordGuildFirestoreData[id]
  idThrower(id)
  if (idRejecter(id)) {
    return Promise.reject('not found')
  }
  if (isNil(discordGuild)) {
    return Promise.reject('not found')
  }
  return Promise.resolve(discordGuild)
}
