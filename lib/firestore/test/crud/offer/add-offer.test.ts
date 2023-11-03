import { DEFAULT_EXPIRATION_TIME } from '@echo/firestore/constants/default-expiration-time'
import { findListingById } from '@echo/firestore/crud/listing/find-listing-by-id'
import { getListingOffersByOfferId } from '@echo/firestore/crud/listing-offer/get-listing-offers-by-offer-id'
import { getListingOffersForOffer } from '@echo/firestore/crud/listing-offer/get-listing-offers-for-offer'
import { addOffer } from '@echo/firestore/crud/offer/add-offer'
import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { ListingOfferFulfillingStatus } from '@echo/firestore/types/model/listing-offer/listing-offer-fulfilling-status'
import { type ListingState } from '@echo/model/types/listing-state'
import { type OfferItem } from '@echo/model/types/offer-item'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { expectDateNumberIs } from '@echo/test-utils/expect-date-number-is'
import { expectDateNumberIsNow } from '@echo/test-utils/expect-date-number-is-now'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { type NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { unchecked_updateListing } from '@test-utils/listing/unchecked_update-listing'
import { assertListingOffers } from '@test-utils/listing-offer/assert-listing-offers'
import { deleteListingOffer } from '@test-utils/listing-offer/delete-listing-offer'
import { assertOffers } from '@test-utils/offer/assert-offers'
import { deleteOffer } from '@test-utils/offer/delete-offer'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'
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
    const newSenderItems = slice(0, 1, senderItems) as NonEmptyArray<OfferItem>
    const createdOffer = await addOffer(newSenderItems, receiverItems)
    createdOfferId = createdOffer.id
    const newOffer = (await findOfferById(createdOfferId))!
    expectDateNumberIsNow(newOffer.createdAt)
    expect(newOffer.receiver).toStrictEqual(receiver)
    expect(newOffer.receiverItems).toStrictEqual(receiverItems)
    expect(newOffer.sender).toStrictEqual(sender)
    expect(newOffer.senderItems).toStrictEqual(newSenderItems)
    expect(newOffer.state).toBe('OPEN')
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
    expect(newListingState).toEqual('OFFERS_PENDING')
  })
})
