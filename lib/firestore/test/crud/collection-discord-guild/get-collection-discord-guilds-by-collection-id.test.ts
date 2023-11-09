import { getCollectionDiscordGuildsByCollectionId } from '@echo/firestore/crud/collection-discord-guild/get-collection-discord-guilds-by-collection-id'
import { getCollectionDiscordGuildMocksByCollectionId } from '@echo/firestore-mocks/collection-discord-guild/get-collection-discord-guild-mocks-by-collection-id'
import { tearDownRemoteFirestoreTests } from '@echo/firestore-test/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@echo/firestore-test/tear-up-remote-firestore-tests'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

describe('CRUD - collection-discord-guild - getCollectionDiscordGuildsByCollectionId', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })
  it('returns an empty array if there is no document for the given collection id', async () => {
    const document = await getCollectionDiscordGuildsByCollectionId('not-found')
    expect(document).toEqual([])
  })
  it('returns the discord guilds associated with the collection id', async () => {
    const collectionId = '1aomCtnoesD7WVll6Yi1'
    const documents = await getCollectionDiscordGuildsByCollectionId(collectionId)
    expect(documents.length).toBe(1)
    expect(documents).toStrictEqual(getCollectionDiscordGuildMocksByCollectionId('1aomCtnoesD7WVll6Yi1'))
  })
})
