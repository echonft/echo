import { findListingById } from '@echo/firestore/crud/listing/find-listing-by-id'
import { addListingOffer } from '@echo/firestore/crud/listing-offer/add-listing-offer'
import { ListingOfferFulfillingStatus } from '@echo/firestore/types/model/listing-offer/listing-offer-fulfilling-status'
import { unchecked_updateListing } from '@echo/firestore-test/listing/unchecked_update-listing'
import { assertListingOffers } from '@echo/firestore-test/listing-offer/assert-listing-offers'
import { deleteListingOffer } from '@echo/firestore-test/listing-offer/delete-listing-offer'
import { findListingOfferById } from '@echo/firestore-test/listing-offer/find-listing-offer-by-id'
import { assertOffers } from '@echo/firestore-test/offer/assert-offers'
import { deleteOffer } from '@echo/firestore-test/offer/delete-offer'
import { unchecked_addOffer } from '@echo/firestore-test/offer/unchecked_add-offer'
import { tearDownRemoteFirestoreTests } from '@echo/firestore-test/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@echo/firestore-test/tear-up-remote-firestore-tests'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

describe('CRUD - listing-offer - addListingOffer', () => {
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

  it('throws if trying to add a listing offer for a listing that does not exist', async () => {
    await expect(
      addListingOffer('not-found', 'LyCfl6Eg7JKuD7XJ6IPi', ListingOfferFulfillingStatus.PARTIALLY)
    ).rejects.toBeDefined()
  })
  it('throws if trying to add a listing offer for an offer that does not exist', async () => {
    await expect(
      addListingOffer('jUzMtPGKM62mMhEcmbN4', 'not-found', ListingOfferFulfillingStatus.PARTIALLY)
    ).rejects.toBeDefined()
  })
  it('throws if trying to add a listing offer with a listingId and offerId already in the db', async () => {
    await expect(
      addListingOffer('jUzMtPGKM62mMhEcmbN4', 'ASkFpKoHEHVH0gd69t1G', ListingOfferFulfillingStatus.PARTIALLY)
    ).rejects.toBeDefined()
  })
  it('add a listing offer', async () => {
    const listingId = 'jUzMtPGKM62mMhEcmbN4'
    const initialListingState = (await findListingById(listingId))!.state
    const { receiverItems, senderItems } = getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi')
    const createdOffer = await unchecked_addOffer(receiverItems, senderItems)
    createdOfferId = createdOffer.id
    const createdListingOffer = await addListingOffer(
      listingId,
      createdOffer.id,
      ListingOfferFulfillingStatus.COMPLETELY
    )
    createdListingOfferId = createdListingOffer.id
    // get the new listing state and reset the listing state to its original value
    const newListingState = (await findListingById(listingId))!.state
    await unchecked_updateListing(listingId, { state: initialListingState })
    const foundListingOffer = await findListingOfferById(createdListingOfferId)
    expect(foundListingOffer).toStrictEqual(createdListingOffer)
    // check if the listing state was correctly updated
    if (initialListingState === 'OPEN') {
      expect(newListingState).toEqual('OFFERS_PENDING')
    } else {
      expect(newListingState).toEqual(initialListingState)
    }
  })
})
