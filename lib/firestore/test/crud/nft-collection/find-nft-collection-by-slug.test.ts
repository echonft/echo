import { findNftCollectionBySlug } from '@echo/firestore/crud/nft-collection/find-nft-collection-by-slug'
import { getNftCollectionMockById } from '@echo/firestore-mocks/nft-collection/get-nft-collection-mock-by-id'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'

describe('CRUD - nft-collection - findNftCollectionBySlug', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })

  it('returns undefined if the collection is not found', async () => {
    const collection = await findNftCollectionBySlug('not-found')
    expect(collection).toBeUndefined()
  })

  it('returns the collection with the given slug', async () => {
    const collection = await findNftCollectionBySlug('pxmythics-genesis')
    expect(collection).toStrictEqual(getNftCollectionMockById('Rc8pLQXxgyQGIRL0fr13'))
  })
})
