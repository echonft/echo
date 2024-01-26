import { DEFAULT_EXPIRATION_TIME } from '@echo/firestore/constants/default-expiration-time'
import { findListingById } from '@echo/firestore/crud/listing/find-listing-by-id'
import { getListingOffersByOfferId } from '@echo/firestore/crud/listing-offer/get-listing-offers-by-offer-id'
import { getListingOffersForOffer } from '@echo/firestore/crud/listing-offer/get-listing-offers-for-offer'
import { addOffer } from '@echo/firestore/crud/offer/add-offer'
import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { ListingOfferFulfillingStatus } from '@echo/firestore/types/model/listing-offer/listing-offer-fulfilling-status'
import { unchecked_updateListing } from '@echo/firestore-test/listing/unchecked_update-listing'
import { assertListingOffers } from '@echo/firestore-test/listing-offer/assert-listing-offers'
import { deleteListingOffer } from '@echo/firestore-test/listing-offer/delete-listing-offer'
import { assertOffers } from '@echo/firestore-test/offer/assert-offers'
import { deleteOffer } from '@echo/firestore-test/offer/delete-offer'
import { tearDownRemoteFirestoreTests } from '@echo/firestore-test/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@echo/firestore-test/tear-up-remote-firestore-tests'
import { LISTING_STATE_OFFERS_PENDING } from '@echo/model/constants/listing-states'
import { OFFER_STATE_OPEN } from '@echo/model/constants/offer-states'
import { type ListingState } from '@echo/model/types/listing-state'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { expectDateNumberIs } from '@echo/utils-test/expect-date-number-is'
import { expectDateNumberIsNow } from '@echo/utils-test/expect-date-number-is-now'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import dayjs from 'dayjs'
import { head, slice } from 'ramda'

describe('CRUD - offer - addOffer', () => {
  const listingId = 'jUzMtPGKM62mMhEcmbN4'
  let initialListingState: ListingState
  let createdOfferId: string
  let createdListingOfferId: string

  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
    initialListingState = (await findListingById(listingId))!.state
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
    try {
      await unchecked_updateListing(listingId, { state: initialListingState })
    } catch (e) {
      throw Error(`error updating listing ${listingId} to its original state: ${errorMessage(e)}`)
    }
    await assertOffers()
    await assertListingOffers()
    await tearDownRemoteFirestoreTests()
  })

  it('throws if the offer is a duplicate', async () => {
    const { receiverItems, senderItems } = getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi')
    await expect(addOffer(senderItems, receiverItems)).rejects.toBeDefined()
  })

  it('add an offer', async () => {
    const { receiver, receiverItems, sender, senderItems } = getOfferMockById('ASkFpKoHEHVH0gd69t1G')
    const newSenderItems = slice(0, 1, senderItems)
    const createdOffer = await addOffer(newSenderItems, receiverItems)
    createdOfferId = createdOffer.id
    const newOffer = (await findOfferById(createdOfferId))!
    expectDateNumberIsNow(newOffer.createdAt)
    expect(newOffer.receiver).toStrictEqual(receiver)
    expect(newOffer.receiverItems).toStrictEqual(receiverItems)
    expect(newOffer.sender).toStrictEqual(sender)
    expect(newOffer.senderItems).toStrictEqual(newSenderItems)
    expect(newOffer.state).toBe(OFFER_STATE_OPEN)
    expectDateNumberIsNow(newOffer.updatedAt)
    expectDateNumberIs(newOffer.expiresAt)(dayjs().add(DEFAULT_EXPIRATION_TIME, 'day'))
    // check if offer has been added to tied listings
    const listingOffers = await getListingOffersForOffer(newOffer)
    expect(listingOffers.length).toBe(1)
    const foundListingOffers = await getListingOffersByOfferId(createdOfferId)
    expect(foundListingOffers.length).toBe(1)
    const createdListingOffer = head(foundListingOffers)!
    createdListingOfferId = createdListingOffer.id
    expect(createdListingOffer.offerId).toEqual(createdOfferId)
    expect(createdListingOffer.listingId).toEqual(listingId)
    expect(createdListingOffer.fulfillingStatus).toEqual(ListingOfferFulfillingStatus.PARTIALLY)
    // check if the listing state was updated
    const newListingState = (await findListingById(listingId))!.state
    expect(newListingState).toEqual(LISTING_STATE_OFFERS_PENDING)
  })
})
