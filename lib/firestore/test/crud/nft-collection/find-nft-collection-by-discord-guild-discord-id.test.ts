import { findNftCollectionByDiscordGuildDiscordId } from '@echo/firestore/crud/nft-collection/find-nft-collection-by-discord-guild-discord-id'
import { nftCollectionMock } from '@echo/firestore-mocks/nft-collection-mock'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'

describe('CRUD - nft-collection - findNftCollectionByDiscordGuildDiscordId', () => {
  beforeAll(tearUpRemoteFirestoreTests)
  afterAll(tearDownRemoteFirestoreTests)

  it('returns undefined if the collection is not found', async () => {
    const collection = await findNftCollectionByDiscordGuildDiscordId('not-found')
    expect(collection).toBeUndefined()
  })

  it('returns the collection with the given discord guild', async () => {
    const collection = await findNftCollectionByDiscordGuildDiscordId('100')
    expect(collection).toStrictEqual(nftCollectionMock['Rc8pLQXxgyQGIRL0fr13'])
  })
})
