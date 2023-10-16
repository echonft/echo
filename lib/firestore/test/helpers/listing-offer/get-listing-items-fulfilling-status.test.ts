import { getListingItemsFulfillingStatus } from '@echo/firestore/helpers/listing-offer/get-listing-items-fulfilling-status'
import { ListingOfferFulfillingStatus } from '@echo/firestore/types/model/listing-offer/listing-offer-fulfilling-status'
import { getNftMockById } from '@echo/firestore-mocks/nft/get-nft-mock-by-id'
import type { ListingItem } from '@echo/model/types/listing-item'
import type { OfferItem } from '@echo/model/types/offer-item'
import { describe, expect, it } from '@jest/globals'

describe('helpers - listing-offer - getListingItemsFulfillingStatus', () => {
  it('returns PARTIALLY if the offer items only match a subset of the listing items', () => {
    const listingItems: ListingItem[] = [
      { amount: 1, nft: getNftMockById('8hHFadIrrooORfTOLkBg') },
      { amount: 1, nft: getNftMockById('iRZFKEujarikVjpiFAkE') }
    ]
    const offerItems: OfferItem[] = [{ amount: 1, nft: getNftMockById('iRZFKEujarikVjpiFAkE') }]
    expect(getListingItemsFulfillingStatus(listingItems, offerItems)).toBe(ListingOfferFulfillingStatus.PARTIALLY)
  })

  it('returns PARTIALLY if the offer items match the listing items but the amount is inferior', () => {
    const listingItems: ListingItem[] = [
      { amount: 2, nft: getNftMockById('8hHFadIrrooORfTOLkBg') },
      { amount: 1, nft: getNftMockById('iRZFKEujarikVjpiFAkE') }
    ]
    const offerItems: OfferItem[] = [
      { amount: 1, nft: getNftMockById('iRZFKEujarikVjpiFAkE') },
      { amount: 1, nft: getNftMockById('8hHFadIrrooORfTOLkBg') }
    ]
    expect(getListingItemsFulfillingStatus(listingItems, offerItems)).toBe(ListingOfferFulfillingStatus.PARTIALLY)
  })

  it('returns COMPLETELY if the offer items match the listing items', () => {
    const listingItems: ListingItem[] = [
      { amount: 1, nft: getNftMockById('8hHFadIrrooORfTOLkBg') },
      { amount: 1, nft: getNftMockById('iRZFKEujarikVjpiFAkE') }
    ]
    const offerItems: OfferItem[] = [
      { amount: 1, nft: getNftMockById('iRZFKEujarikVjpiFAkE') },
      { amount: 1, nft: getNftMockById('8hHFadIrrooORfTOLkBg') }
    ]
    expect(getListingItemsFulfillingStatus(listingItems, offerItems)).toBe(ListingOfferFulfillingStatus.COMPLETELY)
  })

  it('returns COMPLETELY if the offer items match the listing items and more', () => {
    const listingItems: ListingItem[] = [
      { amount: 1, nft: getNftMockById('8hHFadIrrooORfTOLkBg') },
      { amount: 1, nft: getNftMockById('iRZFKEujarikVjpiFAkE') }
    ]
    const offerItems: OfferItem[] = [
      { amount: 1, nft: getNftMockById('iRZFKEujarikVjpiFAkE') },
      { amount: 1, nft: getNftMockById('8hHFadIrrooORfTOLkBg') },
      { amount: 1, nft: getNftMockById('5SeF1NSN5uPUxtWSr516') },
      { amount: 1, nft: getNftMockById('QFjMRNChUAHNswkRADXh') }
    ]
    expect(getListingItemsFulfillingStatus(listingItems, offerItems)).toBe(ListingOfferFulfillingStatus.COMPLETELY)
  })

  it('returns COMPLETELY if the offer items match the listing items and the amount is superior', () => {
    const listingItems: ListingItem[] = [
      { amount: 1, nft: getNftMockById('8hHFadIrrooORfTOLkBg') },
      { amount: 1, nft: getNftMockById('iRZFKEujarikVjpiFAkE') }
    ]
    const offerItems: OfferItem[] = [
      { amount: 3, nft: getNftMockById('iRZFKEujarikVjpiFAkE') },
      { amount: 4, nft: getNftMockById('8hHFadIrrooORfTOLkBg') }
    ]
    expect(getListingItemsFulfillingStatus(listingItems, offerItems)).toBe(ListingOfferFulfillingStatus.COMPLETELY)
  })
})
