import { assertCollectionSwapsCounts } from '@echo/firestore/utils/collection-swaps-count/assert-collection-swaps-counts'
import { getCollectionSwapsCountByCollectionId } from '@echo/firestore/crud/collection-swaps-count/get-collection-swaps-count-by-collection-id'
import { getCollectionSwapsCountByCollectionSlug } from '@echo/firestore/crud/collection-swaps-count/get-collection-swaps-count-by-collection-slug'
import { unchecked_updateCollectionSwapCounts } from '@echo/firestore/utils/collection-swaps-count/unchecked_update-collection-swap-counts'
import { assertSwaps } from '@echo/firestore/utils/swap/assert-swaps'
import { deleteSwap } from '@echo/firestore/crud/swap/delete-swap'
import { getSwapById } from '@echo/firestore/crud/swap/get-swap-by-id'
import { addSwap } from '@echo/firestore/crud/swap/add-swap'
import type { CollectionSwapsCount } from '@echo/firestore/types/model/collection-swaps-count/collection-swaps-count'
import type { Swap } from '@echo/firestore/types/model/swap/swap'
import { getOfferMockById } from '@echo/model/mocks/offer/get-offer-mock-by-id'
import { offerMockFromJohnnycageId, offerMockToJohnnycageId } from '@echo/model/mocks/offer/offer-mock'
import { getOfferItemsCollectionSlugs } from '@echo/model/helpers/offer/get-offer-items-collection-slugs'
import { promiseAll } from '@echo/utils/fp/promise-all'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import dayjs from 'dayjs'
import { andThen, assoc, find, isEmpty, isNil, map, pipe, prop, propEq, reject } from 'ramda'

describe('CRUD - swap - addSwap', () => {
  const offerId = offerMockToJohnnycageId()
  const args: Omit<Swap, 'createdAt'> = {
    offerId,
    transactionId: '0xnew'
  }
  let initialSwapsCounts: CollectionSwapsCount[]
  let createdSwapId: Nullable<string>
  beforeAll(async () => {
    await assertSwaps()
    await assertCollectionSwapsCounts()
  })
  afterAll(async () => {
    await assertSwaps()
    await assertCollectionSwapsCounts()
  })
  beforeEach(() => {
    initialSwapsCounts = []
    createdSwapId = undefined
  })
  afterEach(async () => {
    if (!isNil(createdSwapId)) {
      try {
        await deleteSwap(createdSwapId)
      } catch (e) {
        pinoLogger.error(`Error deleting swap with id ${createdSwapId}: ${errorMessage(e)}`)
      }
    }
    if (!isEmpty(initialSwapsCounts)) {
      for (const swapsCount of initialSwapsCounts) {
        try {
          await unchecked_updateCollectionSwapCounts(swapsCount.collectionId, { swapsCount: swapsCount.swapsCount })
        } catch (e) {
          pinoLogger.error(
            `Error resetting swaps count for collection with id ${swapsCount.collectionId}: ${errorMessage(e)}`
          )
        }
      }
    }
  })
  it('throws if trying to add a swap for an offer that does not exist', async () => {
    await expect(pipe(assoc('offerId', 'not-found'), addSwap)(args)).rejects.toBeDefined()
  })
  it('throws if trying to add a swap for an offer that already has a swap', async () => {
    await expect(pipe(assoc('offerId', offerMockFromJohnnycageId()), addSwap)(args)).rejects.toBeDefined()
  })
  it('add a swap', async () => {
    const offer = getOfferMockById(args.offerId)
    initialSwapsCounts = await pipe(
      getOfferItemsCollectionSlugs,
      map(getCollectionSwapsCountByCollectionSlug),
      promiseAll,
      andThen<Nullable<CollectionSwapsCount>[], CollectionSwapsCount[]>(reject(isNil))
    )(offer)
    const { id } = await addSwap(args)
    createdSwapId = id
    const newSwap = (await getSwapById(id))!
    const updatedSwapsCounts = await pipe(
      map(pipe(prop('collectionId'), getCollectionSwapsCountByCollectionId)),
      promiseAll,
      andThen<Nullable<CollectionSwapsCount>[], CollectionSwapsCount[]>(reject(isNil))
    )(initialSwapsCounts)
    expect(newSwap.offerId).toStrictEqual(args.offerId)
    expect(newSwap.transactionId).toStrictEqual(args.transactionId)
    expect(dayjs.unix(newSwap.createdAt).isAfter(dayjs().subtract(1, 'minute'))).toBeTruthy()
    expect(dayjs.unix(newSwap.createdAt).isBefore(dayjs().add(1, 'minute'))).toBeTruthy()
    // check the swaps count
    expect(updatedSwapsCounts.length).toEqual(initialSwapsCounts.length)
    for (const updatedSwapsCount of updatedSwapsCounts) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const initialSwapsCount: number = pipe(
        find(propEq(updatedSwapsCount.collectionId, 'collectionId')),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        prop('swapsCount')
      )(initialSwapsCounts)
      expect(updatedSwapsCount.swapsCount).toBe(initialSwapsCount + 1)
    }
  })
})
