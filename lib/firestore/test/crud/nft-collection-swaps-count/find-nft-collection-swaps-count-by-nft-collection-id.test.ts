import { findNftCollectionSwapsCountByNftCollectionId } from '@echo/firestore/crud/nft-collection-swaps-count/find-nft-collection-swaps-count-by-nft-collection-id'
import { getNftCollectionSwapsCountMockByCollectionId } from '@echo/firestore-mocks/nft-collection-swaps-count/get-nft-collection-swaps-count-mock-by-collection-id'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'

describe('CRUD - nft-collection-swaps-count - findNftCollectionSwapsCountByNftCollectionId', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })
  it('returns an empty array if there is no document for the given collection id', async () => {
    const document = await findNftCollectionSwapsCountByNftCollectionId('not-found')
    expect(document).toEqual(undefined)
  })
  it('returns the swaps count associated with the collection id', async () => {
    const collectionId = '1aomCtnoesD7WVll6Yi1'
    const document = await findNftCollectionSwapsCountByNftCollectionId(collectionId)
    expect(document).toStrictEqual(getNftCollectionSwapsCountMockByCollectionId('1aomCtnoesD7WVll6Yi1'))
  })
})
