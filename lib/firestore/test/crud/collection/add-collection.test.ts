import { addCollection } from '@echo/firestore/crud/collection/add-collection'
import { deleteCollection } from '@echo/firestore/crud/collection/delete-collection'
import { getCollectionById } from '@echo/firestore/crud/collection/get-collection-by-id'
import { assertCollections } from '@echo/firestore-test/collection/assert-collections'
import { assertCollectionSwapsCounts } from '@echo/firestore-test/collection-swaps-count/assert-collection-swaps-counts'
import { deleteCollectionSwapsCount } from '@echo/firestore-test/collection-swaps-count/delete-collection-swaps-count'
import { getCollectionSwapsCountByCollectionId } from '@echo/firestore-test/collection-swaps-count/get-collection-swaps-count-by-collection-id'
import type { Collection } from '@echo/model/types/collection'
import { COLLECTION_MOCK_PX_ID } from '@echo/model-mocks/collection/collection-mock'
import { getCollectionMockById } from '@echo/model-mocks/collection/get-collection-mock-by-id'
import { TESTNET_CHAIN_SEPOLIA } from '@echo/utils/constants/chain-names'
import { errorMessage } from '@echo/utils/helpers/error-message'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import { assoc, assocPath, isNil, pipe } from 'ramda'

describe('CRUD - collection - addCollection', () => {
  let collectionId: Nullable<string>
  let swapsCountId: Nullable<string>
  beforeAll(async () => {
    await assertCollections()
    await assertCollectionSwapsCounts()
  })
  afterAll(async () => {
    await assertCollections()
    await assertCollectionSwapsCounts()
  })
  beforeEach(() => {
    collectionId = undefined
    swapsCountId = undefined
  })
  afterEach(async () => {
    if (!isNil(collectionId)) {
      try {
        await deleteCollection(collectionId)
      } catch (err) {
        throw Error(`error deleting collection ${collectionId}: ${errorMessage(err)}`)
      }
    }
    if (!isNil(swapsCountId)) {
      try {
        await deleteCollectionSwapsCount(swapsCountId)
      } catch (err) {
        throw Error(`error deleting collection swaps count ${swapsCountId}: ${errorMessage(err)}`)
      }
    }
  })

  it('addCollection', async () => {
    const originalCollection = getCollectionMockById(COLLECTION_MOCK_PX_ID)
    const collectionToAdd = pipe<[Collection], Collection, Collection>(
      assoc('slug', 'slug'),
      assocPath(['contract', 'chain'], TESTNET_CHAIN_SEPOLIA)
    )(originalCollection)
    const newDocument = await addCollection(collectionToAdd)
    collectionId = newDocument.id
    swapsCountId = newDocument.swapsCount.id
    expect(newDocument.data).toStrictEqual(collectionToAdd)
    expect(newDocument.swapsCount.data).toStrictEqual({
      collectionId,
      swapsCount: 0
    })
    const collection = (await getCollectionById(collectionId))!
    const swapsCount = (await getCollectionSwapsCountByCollectionId(collectionId))!
    expect(collection).toStrictEqual(newDocument.data)
    expect(swapsCount).toStrictEqual(newDocument.swapsCount.data)
  })
})
