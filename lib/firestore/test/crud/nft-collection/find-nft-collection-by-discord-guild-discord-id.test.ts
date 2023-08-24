import { findNftCollectionByDiscordGuildDiscordId } from '../../../src/crud/nft-collection/find-nft-collection-by-discord-guild-discord-id'
import { initialize } from '../../../src/services/initialize'
import { terminate } from '../../../src/services/terminate'
import { nftCollectionMock } from '../../mocks/nft-collection-mock'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

describe('CRUD - nft-collection - findNftCollectionByDiscordGuildDiscordId', () => {
  beforeAll(initialize)
  afterAll(terminate)

  it('returns undefined if the collection is not found', async () => {
    const collection = await findNftCollectionByDiscordGuildDiscordId('not-found')
    expect(collection).toBeUndefined()
  })

  it('returns the collection with the given discord guild', async () => {
    const collection = await findNftCollectionByDiscordGuildDiscordId('100')
    expect(collection).toStrictEqual(nftCollectionMock['Rc8pLQXxgyQGIRL0fr13'])
  })
})
