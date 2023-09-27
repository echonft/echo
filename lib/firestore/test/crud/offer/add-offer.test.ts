import { DEFAULT_EXPIRATION_TIME } from '@echo/firestore/constants/default-expiration-time'
import { deleteListingOffer } from '@echo/firestore/crud/listing-offer/delete-listing-offer'
import { getListingOffersByOfferId } from '@echo/firestore/crud/listing-offer/get-listing-offers-by-offer-id'
import { getListingOffersForOffer } from '@echo/firestore/crud/listing-offer/get-listing-offers-for-offer'
import { addOffer } from '@echo/firestore/crud/offer/add-offer'
import { deleteOffer } from '@echo/firestore/crud/offer/delete-offer'
import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { ListingOfferFulfillingStatus } from '@echo/firestore/types/model/listing-offer/listing-offer-fulfilling-status'
import { FirestoreOffer } from '@echo/firestore/types/model/offer/firestore-offer'
import { getOfferMockById } from '@echo/firestore-mocks/offer/get-offer-mock-by-id'
import { expectDateIsNow } from '@echo/test-utils/expect-date-is-now'
import { errorMessage } from '@echo/utils/error/error-message'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { assertListingOffers } from '@test-utils/listing-offer/assert-listing-offers'
import { assertOffers } from '@test-utils/offer/assert-offers'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'
import dayjs from 'dayjs'
import { head } from 'ramda'

describe('CRUD - offer - addOffer', () => {
  let createdOfferId: string
  let createdListingOfferId: string

  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    try {
      await deleteOffer(createdOfferId)
    } catch (e) {
      throw Error(`error deleting offer ${createdOfferId}: ${errorMessage(e)}`)
    }
    try {
      await deleteListingOffer(createdListingOfferId)
    } catch (e) {
      throw Error(`error deleting listing offer ${createdListingOfferId}: ${errorMessage(e)}`)
    }
    await assertOffers()
    await assertListingOffers()
    await tearDownRemoteFirestoreTests()
  })

  it('add an offer', async () => {
    const { receiver, receiverItems, sender, senderItems } = getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi')
    const createdOffer = await addOffer(receiverItems, senderItems)
    createdOfferId = createdOffer.id
    const newOffer = (await findOfferById(createdOfferId)) as FirestoreOffer
    const now = dayjs()
    const expirationDate = now.add(DEFAULT_EXPIRATION_TIME, 'day')
    expectDateIsNow(newOffer.createdAt)
    expect(newOffer.expiresAt.isAfter(expirationDate.subtract(1, 'minute'))).toBeTruthy()
    expect(newOffer.expiresAt.isBefore(expirationDate.add(1, 'minute'))).toBeTruthy()
    expect(newOffer.receiver).toStrictEqual(receiver)
    expect(newOffer.receiverItems).toStrictEqual(receiverItems)
    expect(newOffer.sender).toStrictEqual(sender)
    expect(newOffer.senderItems).toStrictEqual(senderItems)
    expect(newOffer.state).toBe('OPEN')
    // check if offer has been added to tied listings
    const listingOffers = await getListingOffersForOffer(newOffer)
    expect(listingOffers.length).toBe(1)
    const foundListingOffers = await getListingOffersByOfferId(createdOfferId)
    expect(foundListingOffers.length).toBe(1)
    const createdListingOffer = head(foundListingOffers)!
    createdListingOfferId = createdListingOffer.id
    expect(createdListingOffer.offerId).toEqual(createdOfferId)
    expect(createdListingOffer.listingId).toEqual('jUzMtPGKM62mMhEcmbN4')
    expect(createdListingOffer.fulfillingStatus).toEqual(ListingOfferFulfillingStatus.PARTIALLY)
  })
})
