import { addNftCollection } from '../../../src/crud/nft-collection/add-nft-collection'
import { deleteNftCollection } from '../../../src/crud/nft-collection/delete-nft-collection'
import { findNftCollectionById } from '../../../src/crud/nft-collection/find-nft-collection-by-id'
import { nftCollectionMock } from '../../mocks/nft-collection-mock'
import { tearDownRemoteFirestoreTests } from '../../test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '../../test-utils/tear-up-remote-firestore-tests'
import { afterAll, afterEach, beforeAll, describe, expect, it } from '@jest/globals'
import { omit } from 'ramda'

describe('CRUD - nft-collection - addNftCollection', () => {
  let id: string
  beforeAll(tearUpRemoteFirestoreTests)
  afterAll(tearDownRemoteFirestoreTests)
  afterEach(async () => {
    try {
      await deleteNftCollection(id)
    } catch (_err) {
      // collection was never created, test must have failed
    }
  })

  it('addNftCollection', async () => {
    const originalCollection = omit(['id'], nftCollectionMock['Rc8pLQXxgyQGIRL0fr13']!)
    id = await addNftCollection(originalCollection)
    const collection = await findNftCollectionById(id)
    expect(omit(['id'], collection)).toStrictEqual(originalCollection)
  })
})
