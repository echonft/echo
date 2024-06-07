import { getAllCollectionDiscordGuildMocks } from '@echo/firestore/mocks/collection-discord-guild/get-all-collection-discord-guild-mocks'
import { getAllCollectionDiscordGuilds } from '@echo/firestore/crud/collection-discord-guild/get-all-collection-discord-guilds'
import { eqListContent } from '@echo/utils/fp/eq-list-content'
import { expect } from '@jest/globals'

export async function assertCollectionDiscordGuilds() {
  const documents = await getAllCollectionDiscordGuilds()
  expect(eqListContent(documents, getAllCollectionDiscordGuildMocks())).toBeTruthy()
}
