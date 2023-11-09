import { findCollectionByDiscordGuildDiscordId } from '@echo/firestore/crud/collection-discord-guild/find-collection-by-discord-guild-discord-id'
import { tearDownRemoteFirestoreTests } from '@echo/firestore-test/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@echo/firestore-test/tear-up-remote-firestore-tests'
import { collectionMock } from '@echo/model-mocks/collection/collection-mock'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

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
