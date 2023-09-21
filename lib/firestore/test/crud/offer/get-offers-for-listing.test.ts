import { getOffersForListing } from '@echo/firestore/crud/offer/get-offers-for-listing'
import type { FirestoreListingTarget } from '@echo/firestore/types/model/listing/firestore-listing-target'
import type { FirestoreOfferItem } from '@echo/firestore/types/model/offer/firestore-offer-item'
import { getNftMockById } from '@echo/firestore-mocks/nft/get-nft-mock-by-id'
import { getNftCollectionMockById } from '@echo/firestore-mocks/nft-collection/get-nft-collection-mock-by-id'
import { getOfferMockById } from '@echo/firestore-mocks/offer/get-offer-mock-by-id'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'

describe('CRUD - offer - getOffersForListing', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })

  it('returns an empty array if no offer matches the listing items', async () => {
    const items: NonEmptyArray<FirestoreOfferItem> = [{ amount: 1, nft: getNftMockById('QFjMRNChUAHNswkRADXh') }]
    const targets: NonEmptyArray<FirestoreListingTarget> = [
      { amount: 1, collection: getNftCollectionMockById('Rc8pLQXxgyQGIRL0fr13') }
    ]
    const offers = await getOffersForListing(items, targets)
    expect(offers).toEqual([])
  })

  it('returns an empty array if no offer matches the targets', async () => {
    const items: NonEmptyArray<FirestoreOfferItem> = [{ amount: 1, nft: getNftMockById('8hHFadIrrooORfTOLkBg') }]
    const targets: NonEmptyArray<FirestoreListingTarget> = [
      { amount: 1, collection: getNftCollectionMockById('1aomCtnoesD7WVll6Yi1') }
    ]
    const offers = await getOffersForListing(items, targets)
    expect(offers).toEqual([])
  })

  it('returns offers that are tied to the listing', async () => {
    const items: NonEmptyArray<FirestoreOfferItem> = [{ amount: 1, nft: getNftMockById('8hHFadIrrooORfTOLkBg') }]
    const targets: NonEmptyArray<FirestoreListingTarget> = [
      { amount: 1, collection: getNftCollectionMockById('Rc8pLQXxgyQGIRL0fr13') }
    ]
    const offers = await getOffersForListing(items, targets)
    expect(offers).toStrictEqual([getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi')])
  })
})
