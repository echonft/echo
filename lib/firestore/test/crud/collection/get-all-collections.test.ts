import { getAllCollections } from '@echo/firestore/crud/collection/get-all-collections'
import { getAllCollectionMocks } from '@echo/model/mocks/collection/get-all-collection-mocks'
import { eqList } from '@echo/utils/fp/eq-list'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - collection - getAllCollections', () => {
  it('returns all collections', async () => {
    const collections = await getAllCollections()
    expect(eqList(collections, getAllCollectionMocks())).toBeTruthy()
  })
})
