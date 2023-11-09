import { getListingOffersForListing } from '@echo/firestore/crud/listing-offer/get-listing-offers-for-listing'
import { type ListingOffer } from '@echo/firestore/types/model/listing-offer/listing-offer'
import { ListingOfferFulfillingStatus } from '@echo/firestore/types/model/listing-offer/listing-offer-fulfilling-status'
import { tearDownRemoteFirestoreTests } from '@echo/firestore-test/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@echo/firestore-test/tear-up-remote-firestore-tests'
import { type Listing } from '@echo/model/types/listing'
import { type ListingItem } from '@echo/model/types/listing-item'
import { type ListingTarget } from '@echo/model/types/listing-target'
import { getCollectionMockById } from '@echo/model-mocks/collection/get-collection-mock-by-id'
import { getNftMockById } from '@echo/model-mocks/nft/get-nft-mock-by-id'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { head } from 'ramda'

describe('CRUD - listing-offer - getListingOffersForListing', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })

  it('returns an empty array if the listing items do not match any offer', async () => {
    const items: ListingItem[] = [{ amount: 1, nft: getNftMockById('5SeF1NSN5uPUxtWSr516') }]
    const targets: ListingTarget[] = [{ amount: 1, collection: getCollectionMockById('Rc8pLQXxgyQGIRL0fr13') }]
    const listing = { id: 'listing-id', items, targets } as Listing
    const offers = await getListingOffersForListing(listing)
    expect(offers).toEqual([])
  })

  it('returns an empty array if the listing targets do not match any offer', async () => {
    const items: ListingItem[] = [{ amount: 1, nft: getNftMockById('8hHFadIrrooORfTOLkBg') }]
    const targets: ListingTarget[] = [{ amount: 1, collection: { id: 'not-found' } } as ListingTarget]
    const listing = { id: 'listing-id', items, targets } as Listing
    const offers = await getListingOffersForListing(listing)
    expect(offers).toEqual([])
  })

  it('returns partially fulfilled listing offers when not all listing items are in the found offer', async () => {
    const offerId = 'LyCfl6Eg7JKuD7XJ6IPi'
    const listingId = 'listing-id'
    const items: ListingItem[] = [
      { amount: 1, nft: getNftMockById('kRE3UCfXWkJ33nwzj2X1') },
      { amount: 1, nft: getNftMockById('QFjMRNChUAHNswkRADXh') }
    ]
    const targets: ListingTarget[] = [{ amount: 1, collection: getCollectionMockById('1aomCtnoesD7WVll6Yi1') }]
    const listing = { id: listingId, items, targets } as Listing
    const listingOffers = await getListingOffersForListing(listing)
    expect(listingOffers.length).toEqual(1)
    const listingOffer = head(listingOffers) as ListingOffer
    expect(listingOffer.offerId).toEqual(offerId)
    expect(listingOffer.listingId).toEqual(listingId)
    expect(listingOffer.fulfillingStatus).toEqual(ListingOfferFulfillingStatus.PARTIALLY)
  })

  it('returns partially fulfilled listing offers when not all listing targets are in the found offer', async () => {
    const offerId = 'LyCfl6Eg7JKuD7XJ6IPi'
    const listingId = 'listing-id'
    const items: ListingItem[] = [{ amount: 1, nft: getNftMockById('kRE3UCfXWkJ33nwzj2X1') }]
    const targets: ListingTarget[] = [{ amount: 3, collection: getCollectionMockById('1aomCtnoesD7WVll6Yi1') }]
    const listing = { id: listingId, items, targets } as Listing
    const listingOffers = await getListingOffersForListing(listing)
    expect(listingOffers.length).toEqual(1)
    const listingOffer = head(listingOffers) as ListingOffer
    expect(listingOffer.offerId).toEqual(offerId)
    expect(listingOffer.listingId).toEqual(listingId)
    expect(listingOffer.fulfillingStatus).toEqual(ListingOfferFulfillingStatus.PARTIALLY)
  })

  it('returns completely fulfilled listing offers', async () => {
    const offerId = 'LyCfl6Eg7JKuD7XJ6IPi'
    const listingId = 'listing-id'
    const items: ListingItem[] = [{ amount: 1, nft: getNftMockById('kRE3UCfXWkJ33nwzj2X1') }]
    const targets: ListingTarget[] = [{ amount: 1, collection: getCollectionMockById('1aomCtnoesD7WVll6Yi1') }]
    const listing = { id: listingId, items, targets } as Listing
    const listingOffers = await getListingOffersForListing(listing)
    expect(listingOffers.length).toEqual(1)
    const listingOffer = head(listingOffers) as ListingOffer
    expect(listingOffer.offerId).toEqual(offerId)
    expect(listingOffer.listingId).toEqual(listingId)
    expect(listingOffer.fulfillingStatus).toEqual(ListingOfferFulfillingStatus.COMPLETELY)
  })
})
