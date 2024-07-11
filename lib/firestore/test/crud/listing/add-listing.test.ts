import { deleteListingOffer } from '@echo/firestore/crud/listing-offer/delete-listing-offer'
import { getListingOffersByListingId } from '@echo/firestore/crud/listing-offer/get-listing-offers-by-listing-id'
import { getListingOffersForListing } from '@echo/firestore/crud/listing-offer/get-listing-offers-for-listing'
import { addListing } from '@echo/firestore/crud/listing/add-listing'
import { deleteListing } from '@echo/firestore/crud/listing/delete-listing'
import { getAllListings } from '@echo/firestore/crud/listing/get-all-listings'
import { getListingById } from '@echo/firestore/crud/listing/get-listing-by-id'
import { assertListingIsNotADuplicate } from '@echo/firestore/helpers/listing/assert/assert-listing-is-not-a-duplicate'
import type { ListingOffer } from '@echo/firestore/types/model/listing-offer/listing-offer'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { assertListingOffers } from '@echo/firestore/utils/listing-offer/assert-listing-offers'
import { assertListings } from '@echo/firestore/utils/listing/assert-listings'
import { LISTING_STATE_OFFERS_PENDING } from '@echo/model/constants/listing-states'
import { getAllListingMocks } from '@echo/model/mocks/listing/get-all-listing-mocks'
import { getListingMockById } from '@echo/model/mocks/listing/get-listing-mock-by-id'
import { listingMockId } from '@echo/model/mocks/listing/listing-mock'
import { eqListContent } from '@echo/utils/fp/eq-list-content'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import dayjs from 'dayjs'
import { assoc, find, isNil, map, pick, pipe, prop, propEq } from 'ramda'

describe('CRUD - listing - addListing', () => {
  let createdListingId: Nullable<string>
  let createdListingOfferIds: string[]
  beforeAll(async () => {
    await assertListings()
    await assertListingOffers()
  })
  afterAll(async () => {
    await assertListings()
    await assertListingOffers()
  })
  beforeEach(() => {
    createdListingId = undefined
    createdListingOfferIds = []
  })
  afterEach(async () => {
    if (!isNil(createdListingId)) {
      await deleteListing(createdListingId)
    }
    for (const createdListingOfferId of createdListingOfferIds) {
      await deleteListingOffer(createdListingOfferId)
    }
  })

  it('assertListingIsNotADuplicate', async () => {
    await expect(
      pipe(getListingMockById, pick(['items', 'target']), assertListingIsNotADuplicate)(listingMockId())
    ).rejects.toBeDefined()
  })
  it('throws if the listing is a duplicate', async () => {
    const { items, target, expiresAt } = getListingMockById(listingMockId())
    await expect(addListing({ items, target, expiresAt })).rejects.toBeDefined()
    const listings = await getAllListings()
    expect(eqListContent(listings, getAllListingMocks())).toBeTruthy()
  })
  it('add a listing', async () => {
    const { creator, items, target, expiresAt } = getListingMockById(listingMockId())
    const newTarget = assoc('amount', 1, target)
    const newDocument = await addListing({ items, target: newTarget, expiresAt })
    createdListingId = newDocument.id
    createdListingOfferIds = pipe(
      prop('listingOffers'),
      map<NewDocument<ListingOffer>, string>(prop('id'))
    )(newDocument)
    const newListing = (await getListingById(createdListingId))!
    expect(newListing.creator).toStrictEqual(creator)
    expect(newListing.items).toStrictEqual(items)
    expect(newListing.state).toBe(LISTING_STATE_OFFERS_PENDING)
    expect(newListing.target).toStrictEqual(newTarget)
    expect(dayjs.unix(newListing.updatedAt).isAfter(dayjs().subtract(1, 'minute'))).toBeTruthy()
    expect(dayjs.unix(newListing.updatedAt).isBefore(dayjs().add(1, 'minute'))).toBeTruthy()
    expect(newListing.expiresAt).toBe(expiresAt)
    // check if listing offers have been created
    const listingOffers = await getListingOffersForListing(newListing)
    const createdListingOffers = await getListingOffersByListingId(createdListingId)
    expect(createdListingOffers.length).toEqual(1)
    for (const createdListingOffer of createdListingOffers) {
      expect(createdListingOffer).toStrictEqual(find(propEq(createdListingOffer.offerId, 'offerId'), listingOffers))
    }
  })
})
