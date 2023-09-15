import { getAllUserDiscordGuilds } from '@echo/firestore/crud/user-discord-guild/get-all-user-discord-guilds'
import type { FirestoreUserDiscordGuild } from '@echo/firestore/types/model/firestore-user-discord-guild'
import { getAllUserDiscordGuildMocks } from '@echo/firestore-mocks/get-all-user-discord-guild-mocks'
import { getUserDiscordGuildMockById } from '@echo/firestore-mocks/get-user-discord-guild-mock-by-id'
import { expect } from '@jest/globals'
import { forEach } from 'ramda'

export async function assertUserDiscordGuilds() {
  const userDiscordGuildMocks = getAllUserDiscordGuildMocks()
  const userDiscordGuilds = await getAllUserDiscordGuilds()
  expect(userDiscordGuilds.length).toEqual(userDiscordGuildMocks.length)
  forEach((userDiscordGuild: FirestoreUserDiscordGuild) => {
    expect(getUserDiscordGuildMockById(userDiscordGuild.id)).toStrictEqual(userDiscordGuild)
  }, userDiscordGuilds)
}
