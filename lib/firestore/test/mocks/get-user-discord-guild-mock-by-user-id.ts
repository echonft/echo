import { FirestoreUserDiscordGuild } from '@echo/firestore/types/model/firestore-user-discord-guild'
import { getAllUserDiscordGuildMocks } from '@echo/firestore-mocks/get-all-user-discord-guild-mocks'
import { find, propEq } from 'ramda'

export function getUserDiscordGuildMockByUserId(userId: string) {
  const mocks = getAllUserDiscordGuildMocks()
  return find(propEq(userId, 'userId'), mocks) as FirestoreUserDiscordGuild
}
