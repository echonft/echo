import { DEFAULT_EXPIRATION_TIME } from '@echo/firestore/constants/default-expiration-time'
import { getListingsForOffer } from '@echo/firestore/crud/listing/get-listings-for-offer'
import { getListingsWithOfferId } from '@echo/firestore/crud/listing/get-listings-with-offer-id'
import { updateListing } from '@echo/firestore/crud/listing/update-listing'
import { addOffer } from '@echo/firestore/crud/offer/add-offer'
import { deleteOffer } from '@echo/firestore/crud/offer/delete-offer'
import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { offerMock } from '@echo/firestore-mocks/offer-mock'
import { expectDateIsNow } from '@echo/test-utils/expect-date-is-now'
import { afterAll, afterEach, beforeAll, describe, expect, it } from '@jest/globals'
import { assertListings } from '@test-utils/assert-listings'
import { assertOffers } from '@test-utils/assert-offers'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'
import dayjs from 'dayjs'
import { equals, find, map, prop, reject } from 'ramda'

describe('CRUD - offer - addOffer', () => {
  let id: string
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await assertOffers()
    await assertListings()
    await tearDownRemoteFirestoreTests()
  })

  afterEach(async () => {
    try {
      await deleteOffer(id)
      // remove offer from listings
      const listings = await getListingsWithOfferId(id)
      for (const listing of listings) {
        await updateListing(listing.id, { offersIds: reject(equals(id), listing.offersIds) })
      }
    } catch (_err) {
      // offer was never created, test must have failed
    }
  })

  it('add an offer', async () => {
    const { receiver, receiverItems, sender, senderItems } = offerMock['LyCfl6Eg7JKuD7XJ6IPi']!
    const createdOffer = await addOffer(receiverItems, senderItems)
    id = createdOffer.id
    const newOffer = await findOfferById(id)
    const now = dayjs()
    const expirationDate = now.add(DEFAULT_EXPIRATION_TIME, 'day')
    const listings = await getListingsForOffer(senderItems, receiverItems)
    expectDateIsNow(newOffer!.createdAt)
    expect(newOffer!.discordGuild).toBeUndefined()
    expect(newOffer!.expiresAt.isAfter(expirationDate.subtract(1, 'minute'))).toBeTruthy()
    expect(newOffer!.expiresAt.isBefore(expirationDate.add(1, 'minute'))).toBeTruthy()
    expect(newOffer!.receiver).toStrictEqual(receiver)
    expect(newOffer!.receiverItems).toStrictEqual(receiverItems)
    expect(newOffer!.sender).toStrictEqual(sender)
    expect(newOffer!.senderItems).toStrictEqual(senderItems)
    expect(newOffer!.listingsIds).toStrictEqual(map(prop('id'), listings))
    expect(newOffer!.state).toBe('OPEN')
    // check if offer has been added to tied listings
    const newOfferListings = await getListingsForOffer(senderItems, receiverItems)
    for (const listing of newOfferListings) {
      const offerId = find(equals(id), listing.offersIds)
      expect(offerId).toStrictEqual(id)
    }
  })
})
