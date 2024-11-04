import { addCollection } from '@echo/firestore/crud/collection/add-collection'
import { deleteCollection } from '@echo/firestore/crud/collection/delete-collection'
import { getCollectionById } from '@echo/firestore/crud/collection/get-collection-by-id'
import { CollectionError } from '@echo/model/constants/errors/collection-error'
import { collectionMockPx } from '@echo/model/mocks/collection-mock'
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

  it('throws if the collection already exists (by contract)', async () => {
    const collectionToAdd = assoc('slug', 'new-slug', collectionMockPx)
    await expect(addCollection(collectionToAdd)).rejects.toEqual(Error(CollectionError.Exists))
  })

  it('addCollection', async () => {
    const collectionToAdd = assoc('contract', '0xcontract', collectionMockPx)
    const { id } = await addCollection(collectionToAdd)
    collectionId = id
    const collection = await getCollectionById(collectionId)
    expect(collection).toStrictEqual(assoc('slug', `${collectionToAdd.slug}-1`, collectionToAdd))
  })
})
