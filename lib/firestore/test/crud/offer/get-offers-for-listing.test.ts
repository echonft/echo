import { getOffersForListing } from '../../../src/crud/offer/get-offers-for-listing'
import { getNftCollectionMockById } from '../../mocks/get-nft-collection-mock-by-id'
import { getNftMockById } from '../../mocks/get-nft-mock-by-id'
import { getOfferMockById } from '../../mocks/get-offer-mock-by-id'
import { tearDownRemoteFirestoreTests } from '../../test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '../../test-utils/tear-up-remote-firestore-tests'
import { ListingTarget, OfferItem } from '@echo/firestore-types'
import type { NonEmptyArray } from '@echo/utils/types'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

describe('CRUD - offer - getOffersForListing', () => {
  beforeAll(tearUpRemoteFirestoreTests)
  afterAll(tearDownRemoteFirestoreTests)

  it('returns an empty array if no offer matches the listing items', async () => {
    const items: NonEmptyArray<OfferItem> = [{ amount: 1, nft: getNftMockById('QFjMRNChUAHNswkRADXh') }]
    const targets: NonEmptyArray<ListingTarget> = [
      { amount: 1, collection: getNftCollectionMockById('Rc8pLQXxgyQGIRL0fr13') }
    ]
    const offers = await getOffersForListing(items, targets)
    expect(offers).toEqual([])
  })

  it('returns an empty array if no offer matches the targets', async () => {
    const items: NonEmptyArray<OfferItem> = [{ amount: 1, nft: getNftMockById('8hHFadIrrooORfTOLkBg') }]
    const targets: NonEmptyArray<ListingTarget> = [
      { amount: 1, collection: getNftCollectionMockById('1aomCtnoesD7WVll6Yi1') }
    ]
    const offers = await getOffersForListing(items, targets)
    expect(offers).toEqual([])
  })

  it('returns offers that are tied to the listing', async () => {
    const items: NonEmptyArray<OfferItem> = [{ amount: 1, nft: getNftMockById('8hHFadIrrooORfTOLkBg') }]
    const targets: NonEmptyArray<ListingTarget> = [
      { amount: 1, collection: getNftCollectionMockById('Rc8pLQXxgyQGIRL0fr13') }
    ]
    const offers = await getOffersForListing(items, targets)
    expect(offers).toStrictEqual([getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi')])
  })
})
