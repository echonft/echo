import { addCollection } from '@echo/firestore/crud/collection/add-collection'
import { deleteCollection } from '@echo/firestore/crud/collection/delete-collection'
import { getCollectionById } from '@echo/firestore/crud/collection/get-collection-by-id'
import { collectionDocumentMockPx } from '@echo/firestore/mocks/collection-document-mock'
import { CollectionError } from '@echo/model/constants/errors/collection-error'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { assoc, isNil } from 'ramda'

describe('CRUD - collection - addCollection', () => {
  let collectionId: Nullable<string>

  beforeEach(() => {
    collectionId = undefined
  })
  afterEach(async () => {
    if (!isNil(collectionId)) {
      await deleteCollection(collectionId)
    }
  })

  it('addCollection', async () => {
    const { id } = await addCollection(collectionDocumentMockPx)
    collectionId = id
    const collection = await getCollectionById(collectionId)
    expect(collection).toStrictEqual(collectionDocumentMockPx)
  })

  it('throws if the collection already exists', async () => {
    const { id } = await addCollection(collectionDocumentMockPx)
    collectionId = id
    const collectionToAdd = assoc('slug', 'new-slug', collectionDocumentMockPx)
    await expect(addCollection(collectionToAdd)).rejects.toEqual(Error(CollectionError.Exists))
  })
})
