import { findNftCollectionById } from '@echo/firestore/crud/nft-collection/find-nft-collection-by-id'
import { nftCollectionMock } from '@echo/firestore-mocks/nft-collection/nft-collection-mock'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'

describe('CRUD - nft-collection - findNftCollectionById', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })

  it('returns undefined if the collection is not found', async () => {
    const collection = await findNftCollectionById('not-found')
    expect(collection).toBeUndefined()
  })

  it('returns the collection with the given id', async () => {
    const collection = await findNftCollectionById('Rc8pLQXxgyQGIRL0fr13')
    expect(collection).toStrictEqual(nftCollectionMock['Rc8pLQXxgyQGIRL0fr13'])
  })
})
