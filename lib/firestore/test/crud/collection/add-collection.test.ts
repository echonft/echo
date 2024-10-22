import { addCollection } from '@echo/firestore/crud/collection/add-collection'
import { deleteCollection } from '@echo/firestore/crud/collection/delete-collection'
import { getCollectionById } from '@echo/firestore/crud/collection/get-collection-by-id'
import { collectionMockPxId } from '@echo/model/mocks/collection/collection-mock'
import { getCollectionMockById } from '@echo/model/mocks/collection/get-collection-mock-by-id'
import type { Collection } from '@echo/model/types/collection/collection'
import { Chain } from '@echo/utils/constants/chain'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { assoc, assocPath, isNil, pipe } from 'ramda'

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
    const originalCollection = getCollectionMockById(collectionMockPxId())
    const collectionToAdd = pipe<[Collection], Collection, Collection>(
      assoc('slug', 'slug'),
      assocPath(['contract', 'chain'], Chain.Sepolia)
    )(originalCollection)
    const { id } = await addCollection(collectionToAdd)
    collectionId = id
    const collection = await getCollectionById(collectionId)
    expect(collection).toStrictEqual(collectionToAdd)
  })
})
