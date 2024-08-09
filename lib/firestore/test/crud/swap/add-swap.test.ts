import { getCollectionSwapsCountByCollectionId } from '@echo/firestore/crud/collection-swaps-count/get-collection-swaps-count-by-collection-id'
import { getCollectionSwapsCountByCollectionSlug } from '@echo/firestore/crud/collection-swaps-count/get-collection-swaps-count-by-collection-slug'
import { addSwap } from '@echo/firestore/crud/swap/add-swap'
import { deleteSwap } from '@echo/firestore/crud/swap/delete-swap'
import { getSwapById } from '@echo/firestore/crud/swap/get-swap-by-id'
import type { CollectionSwapsCount } from '@echo/firestore/types/model/collection-swaps-count/collection-swaps-count'
import type { Swap } from '@echo/firestore/types/model/swap/swap'
import { unchecked_updateCollectionSwapCounts } from '@echo/firestore/utils/collection-swaps-count/unchecked_update-collection-swap-counts'
import { getOfferItemsCollectionSlugs } from '@echo/model/helpers/offer/get-offer-items-collection-slugs'
import { getOfferMockById } from '@echo/model/mocks/offer/get-offer-mock-by-id'
import { offerMockFromJohnnycageId, offerMockToJohnnycageId } from '@echo/model/mocks/offer/offer-mock'
import { promiseAll } from '@echo/utils/fp/promise-all'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { andThen, assoc, find, isEmpty, isNil, map, pipe, prop, propEq, reject } from 'ramda'

describe('CRUD - swap - addSwap', () => {
  const offerId = offerMockToJohnnycageId()
  const args: Swap = {
    offerId,
    transactionId: '0xnew'
  }
  let initialSwapsCounts: CollectionSwapsCount[]
  let createdSwapId: Nullable<string>
  beforeEach(() => {
    initialSwapsCounts = []
    createdSwapId = undefined
  })
  afterEach(async () => {
    if (!isNil(createdSwapId)) {
      await deleteSwap(createdSwapId)
    }
    if (!isEmpty(initialSwapsCounts)) {
      for (const swapsCount of initialSwapsCounts) {
        await unchecked_updateCollectionSwapCounts(swapsCount.collectionId, { swapsCount: swapsCount.swapsCount })
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
