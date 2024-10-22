import { getCollectionSwapsCountByCollectionId } from '@echo/firestore/crud/collection-swaps-count/get-collection-swaps-count-by-collection-id'
import { getCollectionSwapsCountByCollectionSlug } from '@echo/firestore/crud/collection-swaps-count/get-collection-swaps-count-by-collection-slug'
import { completeOffer, type CompleteOfferArgs } from '@echo/firestore/crud/offer/complete-offer'
import { getOffer } from '@echo/firestore/crud/offer/get-offer'
import type { CollectionSwapsCountDocumentData } from '@echo/firestore/types/model/collection-swaps-count-document-data'
import { unchecked_updateCollectionSwapCounts } from '@echo/firestore/utils/collection-swaps-count/unchecked_update-collection-swap-counts'
import { OfferState } from '@echo/model/constants/offer-state'
import { nftItemsIndex } from '@echo/model/helpers/item/nft-items-index'
import { offerItemsCollectionSlug } from '@echo/model/helpers/offer/offer-items-collection-slug'
import { offerNftItems } from '@echo/model/helpers/offer/offer-nft-items'
import { offerMockToJohnnycageSlug } from '@echo/model/mocks/offer/offer-mock'
import type { NftIndex } from '@echo/model/types/nft/nft'
import { resetNft } from '@echo/test/firestore/crud/nft/reset-nft'
import { resetOffer } from '@echo/test/firestore/crud/offer/reset-offer'
import { updateOffer } from '@echo/test/firestore/crud/offer/update-offer'
import { deleteSwap } from '@echo/test/firestore/crud/swap/delete-swap'
import { promiseAll } from '@echo/utils/fp/promise-all'
import { futureDate } from '@echo/utils/helpers/future-date'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { andThen, assoc, find, isEmpty, isNil, map, pipe, prop, propEq, reject } from 'ramda'

describe('CRUD - offer - completeOffer', () => {
  // const offerId = offerMockToJohnnycageId()
  const slug = offerMockToJohnnycageSlug()
  let initialSwapsCounts: CollectionSwapsCountDocumentData[]
  let createdSwapId: Nullable<string>
  let updatedNftIndexes: NftIndex[]
  const args: CompleteOfferArgs = {
    slug,
    transactionId: 'swap-transaction-id'
  }

  beforeEach(() => {
    createdSwapId = undefined
    initialSwapsCounts = []
    updatedNftIndexes = []
  })
  afterEach(async () => {
    await resetOffer(slug)
    if (!isNil(createdSwapId)) {
      await deleteSwap(createdSwapId)
      // reset the NFTs with their original data
      if (!isEmpty(updatedNftIndexes)) {
        for (const index of updatedNftIndexes) {
          await resetNft(index)
        }
      }
    }
    if (!isEmpty(initialSwapsCounts)) {
      for (const swapsCount of initialSwapsCounts) {
        await unchecked_updateCollectionSwapCounts(swapsCount.collectionId, { swapsCount: swapsCount.swapsCount })
      }
    }
  })

  it('throws if the offer is undefined', async () => {
    await expect(pipe(assoc('slug', 'not-found'), completeOffer)(args)).rejects.toBeDefined()
  })
  it('complete offer', async () => {
    const offer = (await getOffer(slug))!
    expect(offer).toBeDefined()
    initialSwapsCounts = await pipe(
      offerItemsCollectionSlug,
      map(getCollectionSwapsCountByCollectionSlug),
      promiseAll,
      andThen<Nullable<CollectionSwapsCountDocumentData>[], CollectionSwapsCountDocumentData[]>(reject(isNil))
    )(offer)
    expect(initialSwapsCounts).toBeDefined()
    expect(initialSwapsCounts.length).toBe(2)
    await updateOffer(slug, { state: OfferState.Accepted, expiresAt: futureDate() })
    await completeOffer(args)
    const updatedOffer = (await getOffer(slug))!
    updatedNftIndexes = pipe(offerNftItems, nftItemsIndex)(updatedOffer)
    // const swapSnapshot = (await getSwapSnapshot(slug))!
    // createdSwapId = swapSnapshot.id
    // const swap = swapSnapshot.data()
    const updatedSwapsCounts = await pipe(
      map(pipe(prop('collectionId'), getCollectionSwapsCountByCollectionId)),
      promiseAll,
      andThen<Nullable<CollectionSwapsCountDocumentData>[], CollectionSwapsCountDocumentData[]>(reject(isNil))
    )(initialSwapsCounts)
    // check updated offer
    expect(updatedOffer.state).toEqual(OfferState.Completed)
    // check swap
    // expect(swap.offerId).toStrictEqual(offerId)
    // expect(swap.transactionId).toStrictEqual(args.transactionId)
    // check the swaps counts
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
