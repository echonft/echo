import { DEFAULT_EXPIRATION_TIME } from '../../../src/constants/default-expiration-time'
import { getListingsForOffer } from '../../../src/crud/listing/get-listings-for-offer'
import { getListingsWithOfferId } from '../../../src/crud/listing/get-listings-with-offer-id'
import { updateListing } from '../../../src/crud/listing/update-listing'
import { addOffer } from '../../../src/crud/offer/add-offer'
import { deleteOffer } from '../../../src/crud/offer/delete-offer'
import { findOfferById } from '../../../src/crud/offer/find-offer-by-id'
import { offerMock } from '../../mocks/offer-mock'
import { tearDownRemoteFirestoreTests } from '../../test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '../../test-utils/tear-up-remote-firestore-tests'
import { afterAll, afterEach, beforeAll, describe, expect, it } from '@jest/globals'
import dayjs from 'dayjs'
import { equals, find, map, prop, reject } from 'ramda'

describe('CRUD - offer - addOffer', () => {
  let id: string
  beforeAll(tearUpRemoteFirestoreTests)
  afterAll(tearDownRemoteFirestoreTests)
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
    id = await addOffer({ receiver, receiverItems, sender, senderItems })
    const newOffer = await findOfferById(id)
    const now = dayjs()
    const expirationDate = now.add(DEFAULT_EXPIRATION_TIME, 'day')
    const listings = await getListingsForOffer(senderItems, receiverItems)
    expect(newOffer!.createdAt?.isAfter(now.subtract(1, 'minute'))).toBeTruthy()
    expect(newOffer!.createdAt?.isBefore(now.add(1, 'minute'))).toBeTruthy()
    expect(newOffer!.expiresAt?.isAfter(expirationDate.subtract(1, 'minute'))).toBeTruthy()
    expect(newOffer!.expiresAt?.isBefore(expirationDate.add(1, 'minute'))).toBeTruthy()
    expect(newOffer!.receiver).toStrictEqual(receiver)
    expect(newOffer!.receiverItems).toStrictEqual(receiverItems)
    expect(newOffer!.sender).toStrictEqual(sender)
    expect(newOffer!.senderItems).toStrictEqual(senderItems)
    expect(newOffer!.listingsIds).toStrictEqual(map(prop('id'), listings))
    expect(newOffer!.postedAt).toBeUndefined()
    expect(newOffer!.state).toBe('OPEN')
    expect(newOffer!.threadId).toBeUndefined()
    // check if offer has been added to tied listings
    const newOfferListings = await getListingsForOffer(senderItems, receiverItems)
    for (const listing of newOfferListings) {
      const offerId = find(equals(id), listing.offersIds)
      expect(offerId).toStrictEqual(id)
    }
  })
})
