import { findNftCollectionByDiscordGuildDiscordId } from '@echo/firestore/crud/nft-collection-discord-guild/find-nft-collection-by-discord-guild-discord-id'
import { nftCollectionMock } from '@echo/firestore-mocks/nft-collection/nft-collection-mock'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'

describe('CRUD - nft-collection-discord-guild - findNftCollectionByDiscordGuildDiscordId', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })

  it('returns undefined if the collection is not found', async () => {
    const collection = await findNftCollectionByDiscordGuildDiscordId('not-found')
    expect(collection).toBeUndefined()
  })

  it('returns the collection with the given discord guild', async () => {
    const collection = await findNftCollectionByDiscordGuildDiscordId('1')
    expect(collection).toStrictEqual(nftCollectionMock['1aomCtnoesD7WVll6Yi1'])
  })
})
