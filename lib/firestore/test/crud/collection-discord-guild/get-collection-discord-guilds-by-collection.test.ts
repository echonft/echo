import { getCollectionDiscordGuildsByCollection } from '@echo/firestore/crud/collection-discord-guild/get-collection-discord-guilds-by-collection'
import { getCollectionDiscordGuildMocksByCollection } from '@echo/firestore-mocks/collection-discord-guild/get-collection-discord-guild-mocks-by-collection'
import { COLLECTION_MOCK_SPIRAL_ID } from '@echo/model-mocks/collection/collection-mock'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - collection-discord-guild - getCollectionDiscordGuildsByCollection', () => {
  it('returns an empty array if there is no document for the given collection', async () => {
    const document = await getCollectionDiscordGuildsByCollection('not-found')
    expect(document).toEqual([])
  })
  it('returns the discord guilds associated with the collection', async () => {
    const collectionId = COLLECTION_MOCK_SPIRAL_ID
    const documents = await getCollectionDiscordGuildsByCollection(collectionId)
    expect(documents.length).toBe(1)
    expect(documents).toStrictEqual(getCollectionDiscordGuildMocksByCollection(collectionId))
  })
})
