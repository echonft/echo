import { increaseCollectionSwapsCount } from '@echo/firestore/crud/collection-swaps-count/increase-collection-swaps-count'
import { getAllCollectionSwapsCountMocks } from '@echo/firestore-mocks/collection-swaps-count/get-all-collection-swaps-count-mocks'
import { assertCollections } from '@echo/firestore-test/collection/assert-collections'
import { assertCollectionSwapsCounts } from '@echo/firestore-test/collection-swaps-count/assert-collection-swaps-counts'
import { findCollectionSwapsCountByCollectionId } from '@echo/firestore-test/collection-swaps-count/find-collection-swaps-count-by-collection-id'
import { unchecked_updateCollectionSwapCounts } from '@echo/firestore-test/collection-swaps-count/unchecked_update-collection-swap-counts'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import { afterAll, afterEach, beforeAll, describe, expect, it } from '@jest/globals'
import { find, pick, propEq } from 'ramda'

describe('CRUD - collection-swaps-count - increaseCollectionSwapsCount', () => {
  const collectionId = 'Rc8pLQXxgyQGIRL0fr13'
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
    try {
      await unchecked_updateCollectionSwapCounts(swapsCount.id, pick(['swapsCount'], swapsCount))
    } catch (e) {
      pinoLogger.error(`Error reverting collection swaps count with id ${swapsCount.id}: ${errorMessage(e)}`)
    }
  })
  it('throws if trying to increase swaps count for a collection that does not exist', async () => {
    await expect(increaseCollectionSwapsCount('not-found')).rejects.toBeDefined()
  })
  it('if there is already a swap counts for the collectionId, increase it', async () => {
    const initialSwapsCount = (await findCollectionSwapsCountByCollectionId(collectionId))!
    expect(initialSwapsCount.swapsCount).toEqual(1)
    await increaseCollectionSwapsCount(collectionId)
    const updatedSwapsCount = (await findCollectionSwapsCountByCollectionId(collectionId))!
    expect(updatedSwapsCount.collectionId).toEqual(collectionId)
    expect(updatedSwapsCount.swapsCount).toEqual(2)
  })
})
