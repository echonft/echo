import { DEFAULT_EXPIRATION_TIME } from '@echo/firestore/constants/default-expiration-time'
import { addListing } from '@echo/firestore/crud/listing/add-listing'
import { deleteListing } from '@echo/firestore/crud/listing/delete-listing'
import { findListingById } from '@echo/firestore/crud/listing/find-listing-by-id'
import { getOffersForListing } from '@echo/firestore/crud/offer/get-offers-for-listing'
import { getOffersWithListingId } from '@echo/firestore/crud/offer/get-offers-with-listing-id'
import { updateOffer } from '@echo/firestore/crud/offer/update-offer'
import { getListingMockById } from '@echo/firestore-mocks/get-listing-mock-by-id'
import { expectDateIsNow } from '@echo/test-utils/expect-date-is-now'
import { afterAll, afterEach, beforeAll, describe, expect, it } from '@jest/globals'
import { assertListings } from '@test-utils/assert-listings'
import { assertOffers } from '@test-utils/assert-offers'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'
import dayjs from 'dayjs'
import { equals, find, map, prop, reject } from 'ramda'

describe('CRUD - listing - addListing', () => {
  let id: string
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await assertListings()
    await assertOffers()
    await tearDownRemoteFirestoreTests()
  })

  afterEach(async () => {
    try {
      await deleteListing(id)
      // remove listing from offers
      const offers = await getOffersWithListingId(id)
      for (const offer of offers) {
        await updateOffer(offer.id, { listingsIds: reject(equals(id), offer.listingsIds) })
      }
    } catch (_err) {
      // listing was never created, test must have failed
    }
  })

  it('add a listing', async () => {
    const { creator, items, targets } = getListingMockById('jUzMtPGKM62mMhEcmbN4')
    id = await addListing(items, targets)
    const newListing = await findListingById(id)
    const offers = await getOffersForListing(items, targets)
    const now = dayjs()
    const expirationDate = now.add(DEFAULT_EXPIRATION_TIME, 'day')
    expectDateIsNow(newListing!.createdAt)
    expect(newListing!.creator).toStrictEqual(creator)
    expect(newListing!.expiresAt.isAfter(expirationDate.subtract(1, 'minute'))).toBeTruthy()
    expect(newListing!.expiresAt.isBefore(expirationDate.add(1, 'minute'))).toBeTruthy()
    expect(newListing!.items).toStrictEqual(items)
    expect(newListing!.offersIds).toStrictEqual(map(prop('id'), offers))
    expect(newListing!.state).toBe('OPEN')
    expect(newListing!.targets).toStrictEqual(targets)
    // check if listing has been added to tied offers
    const newListingOffers = await getOffersForListing(items, targets)
    for (const offer of newListingOffers) {
      const listingId = find(equals(id), offer.listingsIds)
      expect(listingId).toStrictEqual(id)
    }
  })
})
