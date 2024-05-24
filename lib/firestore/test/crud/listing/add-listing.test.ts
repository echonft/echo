import { addListing } from '@echo/firestore/crud/listing/add-listing'
import { getListingById } from '@echo/firestore/crud/listing/get-listing-by-id'
import { getListingOffersByListingId } from '@echo/firestore/crud/listing-offer/get-listing-offers-by-listing-id'
import { getListingOffersForListing } from '@echo/firestore/crud/listing-offer/get-listing-offers-for-listing'
import { assertListingIsNotADuplicate } from '@echo/firestore/helpers/listing/assert/assert-listing-is-not-a-duplicate'
import type { ListingOffer } from '@echo/firestore/types/model/listing-offer/listing-offer'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { assertListings } from '@echo/firestore-test/listing/assert-listings'
import { deleteListing } from '@echo/firestore-test/listing/delete-listing'
import { getAllListings } from '@echo/firestore-test/listing/get-all-listings'
import { assertListingOffers } from '@echo/firestore-test/listing-offer/assert-listing-offers'
import { deleteListingOffer } from '@echo/firestore-test/listing-offer/delete-listing-offer'
import { DEFAULT_EXPIRATION_TIME } from '@echo/model/constants/default-expiration-time'
import { LISTING_STATE_OFFERS_PENDING } from '@echo/model/constants/listing-states'
import { getAllListingMocks } from '@echo/model-mocks/listing/get-all-listing-mocks'
import { getListingMockById } from '@echo/model-mocks/listing/get-listing-mock-by-id'
import { LISTING_MOCK_ID } from '@echo/model-mocks/listing/listing-mock'
import { eqListContent } from '@echo/utils/fp/eq-list-content'
import { errorMessage } from '@echo/utils/helpers/error-message'
import type { Nullable } from '@echo/utils/types/nullable'
import { expectDateNumberIs } from '@echo/utils-test/expect-date-number-is'
import { expectDateNumberIsNow } from '@echo/utils-test/expect-date-number-is-now'
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
      try {
        await deleteListing(createdListingId)
      } catch (e) {
        throw Error(`error deleting listing with id ${createdListingId}: ${errorMessage(e)}`)
      }
    }
    try {
      // remove listing offers
      for (const createdListingOfferId of createdListingOfferIds) {
        await deleteListingOffer(createdListingOfferId)
      }
    } catch (e) {
      throw Error(`error deleting listing offers ${JSON.stringify(createdListingOfferIds)}: ${errorMessage(e)}`)
    }
  })

  it('assertListingIsNotADuplicate', async () => {
    await expect(
      pipe(getListingMockById, pick(['items', 'target']), assertListingIsNotADuplicate)(LISTING_MOCK_ID)
    ).rejects.toBeDefined()
  })
  it('throws if the listing is a duplicate', async () => {
    const { items, target } = getListingMockById(LISTING_MOCK_ID)
    await expect(addListing({ items, target })).rejects.toBeDefined()
    const listings = await getAllListings()
    expect(eqListContent(listings, getAllListingMocks())).toBeTruthy()
  })
  it('add a listing', async () => {
    const { creator, items, target } = getListingMockById(LISTING_MOCK_ID)
    const newTarget = assoc('amount', 1, target)
    const newDocument = await addListing({ items, target: newTarget })
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
    expectDateNumberIsNow(newListing.updatedAt)
    expectDateNumberIs(newListing.expiresAt)(dayjs().add(DEFAULT_EXPIRATION_TIME, 'day'))
    // check if listing offers have been created
    const listingOffers = await getListingOffersForListing(newListing)
    const createdListingOffers = await getListingOffersByListingId(createdListingId)
    expect(createdListingOffers.length).toEqual(1)
    for (const createdListingOffer of createdListingOffers) {
      expect(createdListingOffer).toStrictEqual(find(propEq(createdListingOffer.offerId, 'offerId'), listingOffers))
    }
  })
})
