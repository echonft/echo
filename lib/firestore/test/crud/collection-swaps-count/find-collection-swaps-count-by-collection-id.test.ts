import { getCollectionSwapsCountMockByCollectionId } from '@echo/firestore-mocks/collection-swaps-count/get-collection-swaps-count-mock-by-collection-id'
import { findCollectionSwapsCountByCollectionId } from '@echo/firestore-test/collection-swaps-count/find-collection-swaps-count-by-collection-id'
import { tearDownRemoteFirestoreTests } from '@echo/firestore-test/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@echo/firestore-test/tear-up-remote-firestore-tests'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

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
