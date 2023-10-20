import { DEFAULT_EXPIRATION_TIME } from '@echo/firestore/constants/default-expiration-time'
import { addListing } from '@echo/firestore/crud/listing/add-listing'
import { findListingById } from '@echo/firestore/crud/listing/find-listing-by-id'
import { getListingOffersByListingId } from '@echo/firestore/crud/listing-offer/get-listing-offers-by-listing-id'
import { getListingOffersForListing } from '@echo/firestore/crud/listing-offer/get-listing-offers-for-listing'
import { type ListingItem } from '@echo/model/types/listing-item'
import { getListingMockById } from '@echo/model-mocks/listing/get-listing-mock-by-id'
import { expectDateNumberIs } from '@echo/test-utils/expect-date-number-is'
import { expectDateNumberIsNow } from '@echo/test-utils/expect-date-number-is-now'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { type NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { assertListings } from '@test-utils/listing/assert-listings'
import { deleteListing } from '@test-utils/listing/delete-listing'
import { assertListingOffers } from '@test-utils/listing-offer/assert-listing-offers'
import { deleteListingOffer } from '@test-utils/listing-offer/delete-listing-offer'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'
import dayjs from 'dayjs'
import { find, map, omit, prop, propEq, slice } from 'ramda'

describe('CRUD - listing - addListing', () => {
  let createdListingId: string
  let createdListingOfferIds: string[]

  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    try {
      await deleteListing(createdListingId)
    } catch (e) {
      throw Error(`error deleting listing with id ${createdListingId}: ${errorMessage(e)}`)
    }
    try {
      // remove listing offers
      for (const createdListingOfferId of createdListingOfferIds) {
        await deleteListingOffer(createdListingOfferId)
      }
    } catch (e) {
      throw Error(`error deleting listing offers ${JSON.stringify(createdListingOfferIds)}: ${errorMessage(e)}`)
    }
    await assertListings()
    await assertListingOffers()
    await tearDownRemoteFirestoreTests()
  })

  it('throws if the listing is a duplicate', async () => {
    const { items, targets } = getListingMockById('jUzMtPGKM62mMhEcmbN4')
    await expect(addListing(items, targets)).rejects.toBeDefined()
  })

  it('add a listing', async () => {
    const { creator, items, targets } = getListingMockById('jUzMtPGKM62mMhEcmbN4')
    const newItems = slice(0, 1, items) as NonEmptyArray<ListingItem>
    const createdListing = await addListing(newItems, targets)
    createdListingId = createdListing.id
    const newListing = (await findListingById(createdListingId))!
    expect(newListing.creator).toStrictEqual(creator)
    expect(newListing.items).toStrictEqual(newItems)
    expect(newListing.state).toBe('OFFERS_PENDING')
    expect(newListing.targets).toStrictEqual(targets)
    expectDateNumberIsNow(newListing.updatedAt)
    expectDateNumberIs(newListing.expiresAt)(dayjs().add(DEFAULT_EXPIRATION_TIME, 'day'))
    // check if listing offers have been created
    const listingOffers = await getListingOffersForListing(newListing)
    const createdListingOffers = await getListingOffersByListingId(createdListingId)
    createdListingOfferIds = map(prop('id'), createdListingOffers)
    expect(createdListingOffers.length).toEqual(1)
    for (const createdListingOffer of createdListingOffers) {
      expect(omit(['id'], createdListingOffer)).toStrictEqual(
        find(propEq(createdListingOffer.offerId, 'offerId'), listingOffers)
      )
    }
  })
})
