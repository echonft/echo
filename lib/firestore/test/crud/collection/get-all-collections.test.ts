import { getAllCollections } from '@echo/firestore/crud/collection/get-all-collections'
import { collectionDocumentMocks } from '@echo/test/firestore/initialize-db'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - collection - getAllCollections', () => {
  it('returns all collections', async () => {
    const collections = await getAllCollections()
    expect(collections).toEqualList(collectionDocumentMocks)
  })
})
