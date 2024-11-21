import { deleteCollection } from '@echo/firestore/crud/collection/delete-collection'
import { getCollectionById } from '@echo/firestore/crud/collection/get-collection-by-id'
import { collectionDocumentMockPx } from '@echo/firestore/mocks/collection-document-mock'
import { addCollection } from '@echo/test/firestore/crud/collection/add-collection'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { isNil } from 'ramda'

describe('CRUD - collection - getCollectionById', () => {
  let collectionId: Nullable<string>

  beforeEach(() => {
    collectionId = undefined
  })
  afterEach(async () => {
    if (!isNil(collectionId)) {
      await deleteCollection(collectionId)
    }
  })

  it('returns undefined if the collection is not found', async () => {
    const collection = await getCollectionById('not-found')
    expect(collection).toBeUndefined()
  })

  it('returns the collection with the given id', async () => {
    collectionId = await addCollection(collectionDocumentMockPx)
    const collection = await getCollectionById(collectionId)
    expect(collection).toStrictEqual(collectionDocumentMockPx)
  })
})
