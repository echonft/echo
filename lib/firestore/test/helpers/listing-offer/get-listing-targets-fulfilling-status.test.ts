import { getListingTargetsFulfillingStatus } from '@echo/firestore/helpers/listing-offer/get-listing-targets-fulfilling-status'
import { ListingOfferFulfillingStatus } from '@echo/firestore/types/model/listing-offer/listing-offer-fulfilling-status'
import { getNftMockById } from '@echo/firestore-mocks/nft/get-nft-mock-by-id'
import { getNftCollectionMockById } from '@echo/firestore-mocks/nft-collection/get-nft-collection-mock-by-id'
import type { ListingTarget } from '@echo/model/types/listing-target'
import type { OfferItem } from '@echo/model/types/offer-item'
import { describe, expect, it } from '@jest/globals'

describe('helpers - listing-offer - getListingTargetsFulfillingStatus', () => {
  it('returns PARTIALLY if the offer items are less than all target amounts', () => {
    const listingTargets: ListingTarget[] = [
      { amount: 3, collection: getNftCollectionMockById('Rc8pLQXxgyQGIRL0fr13') },
      { amount: 3, collection: getNftCollectionMockById('1aomCtnoesD7WVll6Yi1') }
    ]
    const offerItems: OfferItem[] = [
      { amount: 1, nft: getNftMockById('QFjMRNChUAHNswkRADXh') },
      { amount: 1, nft: getNftMockById('XiDa6k2P7gxXCKSxn2wq') }
    ]
    expect(getListingTargetsFulfillingStatus(listingTargets, offerItems)).toBe(ListingOfferFulfillingStatus.PARTIALLY)
  })

  it('returns COMPLETELY if the offer items are greater or equal than any target amount', () => {
    const listingTargets: ListingTarget[] = [
      { amount: 1, collection: getNftCollectionMockById('Rc8pLQXxgyQGIRL0fr13') },
      { amount: 3, collection: getNftCollectionMockById('1aomCtnoesD7WVll6Yi1') }
    ]
    const offerItems: OfferItem[] = [
      { amount: 1, nft: getNftMockById('QFjMRNChUAHNswkRADXh') },
      { amount: 1, nft: getNftMockById('XiDa6k2P7gxXCKSxn2wq') }
    ]
    expect(getListingTargetsFulfillingStatus(listingTargets, offerItems)).toBe(ListingOfferFulfillingStatus.COMPLETELY)
  })
})
