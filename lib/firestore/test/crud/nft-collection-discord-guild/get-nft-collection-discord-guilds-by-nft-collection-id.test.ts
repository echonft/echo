import { getNftCollectionDiscordGuildsByNftCollectionId } from '@echo/firestore/crud/nft-collection-discord-guild/get-nft-collection-discord-guilds-by-nft-collection-id'
import { getNftCollectionDiscordGuildMocksByCollectionId } from '@echo/firestore-mocks/nft-collection-discord-guild/get-nft-collection-discord-guild-mocks-by-collection-id'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'

describe('CRUD - nft-collection-discord-guild - getNftCollectionDiscordGuildsByNftCollectionId', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })
  it('returns an empty array if there is no document for the given collection id', async () => {
    const document = await getNftCollectionDiscordGuildsByNftCollectionId('not-found')
    expect(document).toEqual([])
  })
  it('returns the discord guilds associated with the collection id', async () => {
    const collectionId = '1aomCtnoesD7WVll6Yi1'
    const documents = await getNftCollectionDiscordGuildsByNftCollectionId(collectionId)
    expect(documents.length).toBe(1)
    expect(documents).toStrictEqual(getNftCollectionDiscordGuildMocksByCollectionId('1aomCtnoesD7WVll6Yi1'))
  })
})
