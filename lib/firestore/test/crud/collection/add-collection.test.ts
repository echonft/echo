import { addCollection } from '@echo/firestore/crud/collection/add-collection'
import { deleteCollection } from '@echo/firestore/crud/collection/delete-collection'
import { getCollectionById } from '@echo/firestore/crud/collection/get-collection-by-id'
import { Chain } from '@echo/model/constants/chain'
import { collectionMockPx } from '@echo/model/mocks/collection-mock'
import type { Collection } from '@echo/model/types/collection'
import { removeNilProps } from '@echo/utils/helpers/remove-nil-props'
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
    const collectionToAdd = pipe<[Collection], Collection, Collection, Collection>(
      removeNilProps,
      assoc('slug', 'slug'),
      assocPath(['contract', 'chain'], Chain.Sepolia)
    )(collectionMockPx)
    const { id } = await addCollection(collectionToAdd)
    collectionId = id
    const collection = await getCollectionById(collectionId)
    expect(collection).toStrictEqual(collectionToAdd)
  })
})
