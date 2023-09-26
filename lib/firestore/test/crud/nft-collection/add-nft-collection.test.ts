import { addNftCollection } from '@echo/firestore/crud/nft-collection/add-nft-collection'
import { deleteNftCollection } from '@echo/firestore/crud/nft-collection/delete-nft-collection'
import { findNftCollectionById } from '@echo/firestore/crud/nft-collection/find-nft-collection-by-id'
import { getNftCollectionMockById } from '@echo/firestore-mocks/nft-collection/get-nft-collection-mock-by-id'
import { afterAll, afterEach, beforeAll, describe, expect, it } from '@jest/globals'
import { assertNftCollections } from '@test-utils/nft-collection/assert-nft-collections'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'
import { omit } from 'ramda'

describe('CRUD - nft-collection - addNftCollection', () => {
  let id: string
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await assertNftCollections()
    await tearDownRemoteFirestoreTests()
  })

  afterEach(async () => {
    try {
      await deleteNftCollection(id)
    } catch (_err) {
      // collection was never created, test must have failed
    }
  })

  it('addNftCollection', async () => {
    const originalCollection = omit(['id'], getNftCollectionMockById('Rc8pLQXxgyQGIRL0fr13'))
    id = await addNftCollection(originalCollection)
    const collection = await findNftCollectionById(id)
    expect(omit(['id'], collection)).toStrictEqual(originalCollection)
  })
})
