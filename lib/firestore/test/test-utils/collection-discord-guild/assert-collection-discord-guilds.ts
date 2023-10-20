import { type CollectionDiscordGuild } from '@echo/firestore/types/model/collection-discord-guild/collection-discord-guild'
import { getAllCollectionDiscordGuildMocks } from '@echo/firestore-mocks/collection-discord-guild/get-all-collection-discord-guild-mocks'
import { getCollectionDiscordGuildMockById } from '@echo/firestore-mocks/collection-discord-guild/get-collection-discord-guild-mock-by-id'
import { expect } from '@jest/globals'
import { getAllCollectionDiscordGuilds } from '@test-utils/collection-discord-guild/get-all-collection-discord-guilds'
import { forEach } from 'ramda'

export async function assertCollectionDiscordGuilds() {
  const collectionDiscordGuildMocks = getAllCollectionDiscordGuildMocks()
  const collectionDiscordGuilds = await getAllCollectionDiscordGuilds()
  expect(collectionDiscordGuilds.length).toEqual(collectionDiscordGuildMocks.length)
  forEach((collectionDiscordGuild: CollectionDiscordGuild) => {
    expect(collectionDiscordGuild).toStrictEqual(getCollectionDiscordGuildMockById(collectionDiscordGuild.id))
  }, collectionDiscordGuilds)
}
