import { addListing } from '@echo/firestore/crud/listing/add-listing'
import { getListingById } from '@echo/firestore/crud/listing/get-listing-by-id'
import { getListingOffersByListingId } from '@echo/firestore/crud/listing-offer/get-listing-offers-by-listing-id'
import { getListingOffersForListing } from '@echo/firestore/crud/listing-offer/get-listing-offers-for-listing'
import type { ListingOffer } from '@echo/firestore/types/model/listing-offer/listing-offer'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { assertListings } from '@echo/firestore-test/listing/assert-listings'
import { deleteListing } from '@echo/firestore-test/listing/delete-listing'
import { assertListingOffers } from '@echo/firestore-test/listing-offer/assert-listing-offers'
import { deleteListingOffer } from '@echo/firestore-test/listing-offer/delete-listing-offer'
import { DEFAULT_EXPIRATION_TIME } from '@echo/model/constants/default-expiration-time'
import { LISTING_STATE_OFFERS_PENDING } from '@echo/model/constants/listing-states'
import { getListingMockById } from '@echo/model-mocks/listing/get-listing-mock-by-id'
import { errorMessage } from '@echo/utils/helpers/error-message'
import type { Nullable } from '@echo/utils/types/nullable'
import { expectDateNumberIs } from '@echo/utils-test/expect-date-number-is'
import { expectDateNumberIsNow } from '@echo/utils-test/expect-date-number-is-now'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import dayjs from 'dayjs'
import { find, isNil, map, pipe, prop, propEq, slice } from 'ramda'

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

  it('throws if the listing is a duplicate', async () => {
    const { items, target } = getListingMockById('jUzMtPGKM62mMhEcmbN4')
    await expect(addListing({ items, target })).rejects.toBeDefined()
  })
  it('add a listing', async () => {
    const { creator, items, target } = getListingMockById('jUzMtPGKM62mMhEcmbN4')
    const newItems = slice(0, 1, items)
    const newDocument = await addListing({ items, target })
    createdListingId = newDocument.id
    createdListingOfferIds = pipe(
      prop('listingOffers'),
      map<NewDocument<ListingOffer>, string>(prop('id'))
    )(newDocument)
    const newListing = (await getListingById(createdListingId))!
    expect(newListing.creator).toStrictEqual(creator)
    expect(newListing.items).toStrictEqual(newItems)
    expect(newListing.state).toBe(LISTING_STATE_OFFERS_PENDING)
    expect(newListing.target).toStrictEqual(target)
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
