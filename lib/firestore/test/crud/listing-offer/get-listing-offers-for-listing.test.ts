import { getListingOffersForListing } from '@echo/firestore/crud/listing-offer/get-listing-offers-for-listing'
import { ListingOfferFulfillingStatus } from '@echo/firestore/types/model/listing-offer/listing-offer-fulfilling-status'
import { getNftMockById } from '@echo/firestore-mocks/nft/get-nft-mock-by-id'
import { getNftCollectionMockById } from '@echo/firestore-mocks/nft-collection/get-nft-collection-mock-by-id'
import type { Listing } from '@echo/model/types/listing'
import type { ListingItem } from '@echo/model/types/listing-item'
import type { ListingTarget } from '@echo/model/types/listing-target'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'

describe('CRUD - listing-offer - getListingOffersForListing', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })

  it('returns an empty array if the listing items do not match any offer', async () => {
    const items: ListingItem[] = [{ amount: 1, nft: getNftMockById('5SeF1NSN5uPUxtWSr516') }]
    const targets: ListingTarget[] = [{ amount: 1, collection: getNftCollectionMockById('Rc8pLQXxgyQGIRL0fr13') }]
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
    const offerId = 'ASkFpKoHEHVH0gd69t1G'
    const offerId2 = 'LyCfl6Eg7JKuD7XJ6IPi'
    const listingId = 'listing-id'
    const items: ListingItem[] = [
      { amount: 1, nft: getNftMockById('kRE3UCfXWkJ33nwzj2X1') },
      { amount: 1, nft: getNftMockById('QFjMRNChUAHNswkRADXh') }
    ]
    const targets: ListingTarget[] = [{ amount: 1, collection: getNftCollectionMockById('1aomCtnoesD7WVll6Yi1') }]
    const listing = { id: listingId, items, targets } as Listing
    const listingOffers = await getListingOffersForListing(listing)
    expect(listingOffers.length).toEqual(2)
    expect(listingOffers[0]!.offerId).toEqual(offerId)
    expect(listingOffers[0]!.listingId).toEqual(listingId)
    expect(listingOffers[0]!.fulfillingStatus).toEqual(ListingOfferFulfillingStatus.PARTIALLY)
    expect(listingOffers[1]!.offerId).toEqual(offerId2)
    expect(listingOffers[1]!.listingId).toEqual(listingId)
    expect(listingOffers[1]!.fulfillingStatus).toEqual(ListingOfferFulfillingStatus.PARTIALLY)
  })

  it('returns partially fulfilled listing offers when not all listing targets are in the found offer', async () => {
    const offerId = 'ASkFpKoHEHVH0gd69t1G'
    const offerId2 = 'LyCfl6Eg7JKuD7XJ6IPi'
    const listingId = 'listing-id'
    const items: ListingItem[] = [{ amount: 1, nft: getNftMockById('kRE3UCfXWkJ33nwzj2X1') }]
    const targets: ListingTarget[] = [{ amount: 3, collection: getNftCollectionMockById('1aomCtnoesD7WVll6Yi1') }]
    const listing = { id: listingId, items, targets } as Listing
    const listingOffers = await getListingOffersForListing(listing)
    expect(listingOffers.length).toEqual(2)
    expect(listingOffers[0]!.offerId).toEqual(offerId)
    expect(listingOffers[0]!.listingId).toEqual(listingId)
    expect(listingOffers[0]!.fulfillingStatus).toEqual(ListingOfferFulfillingStatus.PARTIALLY)
    expect(listingOffers[1]!.offerId).toEqual(offerId2)
    expect(listingOffers[1]!.listingId).toEqual(listingId)
    expect(listingOffers[1]!.fulfillingStatus).toEqual(ListingOfferFulfillingStatus.PARTIALLY)
  })

  it('returns completely fulfilled listing offers', async () => {
    const offerId = 'ASkFpKoHEHVH0gd69t1G'
    const offerId2 = 'LyCfl6Eg7JKuD7XJ6IPi'
    const listingId = 'listing-id'
    const items: ListingItem[] = [{ amount: 1, nft: getNftMockById('kRE3UCfXWkJ33nwzj2X1') }]
    const targets: ListingTarget[] = [{ amount: 1, collection: getNftCollectionMockById('1aomCtnoesD7WVll6Yi1') }]
    const listing = { id: listingId, items, targets } as Listing
    const listingOffers = await getListingOffersForListing(listing)
    expect(listingOffers.length).toEqual(2)
    expect(listingOffers[0]!.offerId).toEqual(offerId)
    expect(listingOffers[0]!.listingId).toEqual(listingId)
    expect(listingOffers[0]!.fulfillingStatus).toEqual(ListingOfferFulfillingStatus.COMPLETELY)
    expect(listingOffers[1]!.offerId).toEqual(offerId2)
    expect(listingOffers[1]!.listingId).toEqual(listingId)
    expect(listingOffers[1]!.fulfillingStatus).toEqual(ListingOfferFulfillingStatus.COMPLETELY)
  })
})
