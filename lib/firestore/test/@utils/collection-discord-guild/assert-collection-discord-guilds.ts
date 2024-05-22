import { getAllCollectionDiscordGuildMocks } from '@echo/firestore-mocks/collection-discord-guild/get-all-collection-discord-guild-mocks'
import { getAllCollectionDiscordGuilds } from '@echo/firestore-test/collection-discord-guild/get-all-collection-discord-guilds'
import { contentEq } from '@echo/utils/fp/content-eq'
import { expect } from '@jest/globals'

export async function assertCollectionDiscordGuilds() {
  const documents = await getAllCollectionDiscordGuilds()
  expect(contentEq(documents, getAllCollectionDiscordGuildMocks())).toBeTruthy()
}
