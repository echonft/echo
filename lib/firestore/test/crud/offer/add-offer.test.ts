import { DEFAULT_EXPIRATION_TIME } from '@echo/firestore/constants/default-expiration-time'
import { findListingById } from '@echo/firestore/crud/listing/find-listing-by-id'
import { addOffer } from '@echo/firestore/crud/offer/add-offer'
import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { unchecked_updateListing } from '@echo/firestore-test/listing/unchecked_update-listing'
import { assertOffers } from '@echo/firestore-test/offer/assert-offers'
import { deleteOffer } from '@echo/firestore-test/offer/delete-offer'
import { tearDownRemoteFirestoreTests } from '@echo/firestore-test/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@echo/firestore-test/tear-up-remote-firestore-tests'
import { OFFER_STATE_OPEN } from '@echo/model/constants/offer-states'
import { type ListingState } from '@echo/model/types/listing-state'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { expectDateNumberIs } from '@echo/utils-test/expect-date-number-is'
import { expectDateNumberIsNow } from '@echo/utils-test/expect-date-number-is-now'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import dayjs from 'dayjs'
import { slice } from 'ramda'

describe('CRUD - offer - addOffer', () => {
  const listingId = 'jUzMtPGKM62mMhEcmbN4'
  let initialListingState: ListingState
  let createdOfferId: string

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
      await unchecked_updateListing(listingId, { state: initialListingState })
    } catch (e) {
      throw Error(`error updating listing ${listingId} to its original state: ${errorMessage(e)}`)
    }
    await assertOffers()
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
  })
})
