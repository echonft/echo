import { DEFAULT_EXPIRATION_TIME } from '@echo/firestore/constants/default-expiration-time'
import { addListing } from '@echo/firestore/crud/listing/add-listing'
import { deleteListing } from '@echo/firestore/crud/listing/delete-listing'
import { findListingById } from '@echo/firestore/crud/listing/find-listing-by-id'
import { deleteListingOffer } from '@echo/firestore/crud/listing-offer/delete-listing-offer'
import { getListingOffersByListingId } from '@echo/firestore/crud/listing-offer/get-listing-offers-by-listing-id'
import { getListingOffersForListing } from '@echo/firestore/crud/listing-offer/get-listing-offers-for-listing'
import { getListingMockById } from '@echo/firestore-mocks/listing/get-listing-mock-by-id'
import { expectDateIsNow } from '@echo/test-utils/expect-date-is-now'
import { errorMessage } from '@echo/utils/error/error-message'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { assertListings } from '@test-utils/listing/assert-listings'
import { assertListingOffers } from '@test-utils/listing-offer/assert-listing-offers'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'
import dayjs from 'dayjs'
import { find, map, omit, prop, propEq } from 'ramda'

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

  it('add a listing', async () => {
    const { creator, items, targets } = getListingMockById('jUzMtPGKM62mMhEcmbN4')
    const createdListing = await addListing(items, targets)
    createdListingId = createdListing.id
    const newListing = (await findListingById(createdListingId))!
    const now = dayjs()
    const expirationDate = now.add(DEFAULT_EXPIRATION_TIME, 'day')
    expectDateIsNow(newListing.createdAt)
    expect(newListing.creator).toStrictEqual(creator)
    expect(newListing.expiresAt.isAfter(expirationDate.subtract(1, 'minute'))).toBeTruthy()
    expect(newListing.expiresAt.isBefore(expirationDate.add(1, 'minute'))).toBeTruthy()
    expect(newListing.items).toStrictEqual(items)
    expect(newListing.state).toBe('OPEN')
    expect(newListing.targets).toStrictEqual(targets)
    expectDateIsNow(newListing.updatedAt)
    // check if listing offers have been created
    const listingOffers = await getListingOffersForListing(newListing)
    const createdListingOffers = await getListingOffersByListingId(createdListingId)
    createdListingOfferIds = map(prop('id'), createdListingOffers)
    expect(createdListingOffers.length).toEqual(2)
    for (const createdListingOffer of createdListingOffers) {
      expect(omit(['id'], createdListingOffer)).toStrictEqual(
        find(propEq(createdListingOffer.offerId, 'offerId'), listingOffers)
      )
    }
  })
})
