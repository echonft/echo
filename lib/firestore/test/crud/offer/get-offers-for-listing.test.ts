import { getOffersForListing } from '../../../src/crud/offer/get-offers-for-listing'
import { initialize } from '../../../src/services/initialize'
import { terminate } from '../../../src/services/terminate'
import { ListingTarget } from '../../../src/types/model/listing-target'
import { OfferItem } from '../../../src/types/model/offer-item'
import { getCollectionMockById } from '../../mocks/get-collection-mock-by-id'
import { getNftMockById } from '../../mocks/get-nft-mock-by-id'
import { getOfferMockById } from '../../mocks/get-offer-mock-by-id'
import { NonEmptyArray } from '@echo/utils'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

describe('CRUD - offer - getOffersForListing', () => {
  beforeAll(initialize)
  afterAll(terminate)

  it('returns an empty array if no offer matches the listing items', async () => {
    const items: NonEmptyArray<OfferItem> = [{ amount: 1, nft: getNftMockById('QFjMRNChUAHNswkRADXh') }]
    const targets: NonEmptyArray<ListingTarget> = [
      { amount: 1, collection: getCollectionMockById('Rc8pLQXxgyQGIRL0fr13') }
    ]
    const offers = await getOffersForListing(items, targets)
    expect(offers).toEqual([])
  })

  it('returns an empty array if no offer matches the targets', async () => {
    const items: NonEmptyArray<OfferItem> = [{ amount: 1, nft: getNftMockById('8hHFadIrrooORfTOLkBg') }]
    const targets: NonEmptyArray<ListingTarget> = [
      { amount: 1, collection: getCollectionMockById('1aomCtnoesD7WVll6Yi1') }
    ]
    const offers = await getOffersForListing(items, targets)
    expect(offers).toEqual([])
  })

  it('returns offers that are tied to the listing', async () => {
    const items: NonEmptyArray<OfferItem> = [{ amount: 1, nft: getNftMockById('8hHFadIrrooORfTOLkBg') }]
    const targets: NonEmptyArray<ListingTarget> = [
      { amount: 1, collection: getCollectionMockById('Rc8pLQXxgyQGIRL0fr13') }
    ]
    const offers = await getOffersForListing(items, targets)
    expect(offers).toStrictEqual([getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi')])
  })
})
