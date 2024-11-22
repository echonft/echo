import { deleteCollection } from '@echo/firestore/crud/collection/delete-collection'
import { getAllCollections } from '@echo/firestore/crud/collection/get-all-collections'
import { collectionDocumentMockPx, collectionDocumentMockSpiral } from '@echo/firestore/mocks/collection-document-mock'
import { addCollection } from '@echo/test/firestore/crud/collection/add-collection'
import { collectionDocumentMocks } from '@echo/test/firestore/mocks'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { andThen, isEmpty, pipe } from 'ramda'

describe('CRUD - collection - getAllCollections', () => {
  let collectionIds: string[]

  beforeEach(() => {
    collectionIds = []
  })
  afterEach(async () => {
    if (!isEmpty(collectionIds)) {
      for (const id of collectionIds) {
        await deleteCollection(id)
      }
    }
  })

  it('returns all collections', async () => {
    await pipe(
      addCollection,
      andThen((id) => {
        collectionIds.push(id)
      })
    )(collectionDocumentMockPx)
    await pipe(
      addCollection,
      andThen((id) => {
        collectionIds.push(id)
      })
    )(collectionDocumentMockSpiral)

    const collections = await getAllCollections()
    expect(collections).toEqualList(collectionDocumentMocks)
  })
})
