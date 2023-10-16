import { findCollectionByDiscordGuildDiscordId } from '@echo/firestore/crud/collection-discord-guild/find-collection-by-discord-guild-discord-id'
import { collectionMock } from '@echo/firestore-mocks/collection/collection-mock'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'

describe('CRUD - collection-discord-guild - findCollectionByDiscordGuildDiscordId', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })

  it('returns undefined if the collection is not found', async () => {
    const collection = await findCollectionByDiscordGuildDiscordId('not-found')
    expect(collection).toBeUndefined()
  })

  it('returns the collection with the given discord guild', async () => {
    const collection = await findCollectionByDiscordGuildDiscordId('1')
    expect(collection).toStrictEqual(collectionMock['1aomCtnoesD7WVll6Yi1'])
  })
})
