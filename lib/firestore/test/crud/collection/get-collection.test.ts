import { deleteCollection } from '@echo/firestore/crud/collection/delete-collection'
import { getCollection } from '@echo/firestore/crud/collection/get-collection'
import { collectionDocumentMockPx, collectionDocumentMockSpiral } from '@echo/firestore/mocks/collection-document-mock'
import { addCollection } from '@echo/test/firestore/crud/collection/add-collection'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { andThen, isEmpty, pipe } from 'ramda'

describe('CRUD - collection - getCollection', () => {
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

  it('returns undefined if the collection is not found', async () => {
    await expect(getCollection('not-found')).resolves.toBeUndefined()
  })

  it('returns the collection with the given slug', async () => {
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

    await expect(getCollection(collectionDocumentMockPx.slug)).resolves.toStrictEqual(collectionDocumentMockPx)
    await expect(getCollection(collectionDocumentMockSpiral.slug)).resolves.toStrictEqual(collectionDocumentMockSpiral)
  })
})
