import { getAllCollections } from '@echo/firestore/crud/collection/get-all-collections'
import { collectionMocks } from '@echo/model/mocks/collection-mock'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - collection - getAllCollections', () => {
  it('returns all collections', async () => {
    const collections = await getAllCollections()
    // expect(eqList(collections, getAllCollectionMocks())).toBeTruthy()
    expect(collections).toStrictEqual(collectionMocks)
  })
})
