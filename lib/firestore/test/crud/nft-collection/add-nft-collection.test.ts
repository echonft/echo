import { addNftCollection } from '../../../src/crud/nft-collection/add-nft-collection'
import { deleteNftCollection } from '../../../src/crud/nft-collection/delete-nft-collection'
import { findNftCollectionById } from '../../../src/crud/nft-collection/find-nft-collection-by-id'
import { initialize } from '../../../src/services/initialize'
import { terminate } from '../../../src/services/terminate'
import { nftCollectionMock } from '../../mocks/nft-collection-mock'
import { afterAll, afterEach, beforeAll, describe, expect, it } from '@jest/globals'
import { omit } from 'ramda'

describe('CRUD - nft-collection - addNftCollection', () => {
  let id: string
  beforeAll(initialize)
  afterAll(terminate)
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
