import { findCollectionSwapsCountByCollectionId } from '@echo/firestore/crud/collection-swaps-count/find-collection-swaps-count-by-collection-id'
import { getCollectionSwapsCountMockByCollectionId } from '@echo/firestore-mocks/collection-swaps-count/get-collection-swaps-count-mock-by-collection-id'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'

describe('CRUD - collection-swaps-count - findCollectionSwapsCountByCollectionId', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })
  it('returns an empty array if there is no document for the given collection id', async () => {
    const document = await findCollectionSwapsCountByCollectionId('not-found')
    expect(document).toEqual(undefined)
  })
  it('returns the swaps count associated with the collection id', async () => {
    const collectionId = '1aomCtnoesD7WVll6Yi1'
    const document = await findCollectionSwapsCountByCollectionId(collectionId)
    expect(document).toStrictEqual(getCollectionSwapsCountMockByCollectionId('1aomCtnoesD7WVll6Yi1'))
  })
})
