import { getCollectionSwapsCountByCollectionId } from '@echo/firestore/crud/collection-swaps-count/get-collection-swaps-count-by-collection-id'
import { increaseCollectionSwapsCount } from '@echo/firestore/crud/collection-swaps-count/increase-collection-swaps-count'
import { getAllCollectionSwapsCountMocks } from '@echo/firestore/mocks/collection-swaps-count/get-all-collection-swaps-count-mocks'
import { assertCollectionSwapsCounts } from '@echo/firestore/utils/collection-swaps-count/assert-collection-swaps-counts'
import { unchecked_updateCollectionSwapCounts } from '@echo/firestore/utils/collection-swaps-count/unchecked_update-collection-swap-counts'
import { assertCollections } from '@echo/firestore/utils/collection/assert-collections'
import { collectionMockPxId, collectionMockPxSlug } from '@echo/model/mocks/collection/collection-mock'
import { afterAll, afterEach, beforeAll, describe, expect, it } from '@jest/globals'
import { find, pick, propEq } from 'ramda'

describe('CRUD - collection-swaps-count - increaseCollectionSwapsCount', () => {
  const collectionSlug = collectionMockPxSlug()
  const collectionId = collectionMockPxId()
  beforeAll(async () => {
    await assertCollections()
    await assertCollectionSwapsCounts()
  })
  afterAll(async () => {
    await assertCollections()
    await assertCollectionSwapsCounts()
  })
  afterEach(async () => {
    // reset the count
    const swapsCount = find(propEq(collectionId, 'collectionId'), getAllCollectionSwapsCountMocks())!
    await unchecked_updateCollectionSwapCounts(collectionId, pick(['swapsCount'], swapsCount))
  })
  it('throws if trying to increase swaps count for a collection that does not exist', async () => {
    await expect(increaseCollectionSwapsCount('not-found')).rejects.toBeDefined()
  })
  it('if there is already a swap counts for the collectionId, increase it', async () => {
    const initialSwapsCount = (await getCollectionSwapsCountByCollectionId(collectionId))!
    expect(initialSwapsCount.swapsCount).toEqual(1)
    await increaseCollectionSwapsCount(collectionSlug)
    const updatedSwapsCount = (await getCollectionSwapsCountByCollectionId(collectionId))!
    expect(updatedSwapsCount.collectionId).toEqual(collectionId)
    expect(updatedSwapsCount.swapsCount).toEqual(2)
  })
})
