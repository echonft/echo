import { getListingById } from '@echo/firestore/crud/listing/get-listing-by-id'
import { addListingOffer } from '@echo/firestore/crud/listing-offer/add-listing-offer'
import { ListingOfferFulfillingStatus } from '@echo/firestore/types/model/listing-offer/listing-offer-fulfilling-status'
import { unchecked_updateListing } from '@echo/firestore-test/listing/unchecked_update-listing'
import { assertListingOffers } from '@echo/firestore-test/listing-offer/assert-listing-offers'
import { deleteListingOffer } from '@echo/firestore-test/listing-offer/delete-listing-offer'
import { getListingOfferById } from '@echo/firestore-test/listing-offer/get-listing-offer-by-id'
import { assertOffers } from '@echo/firestore-test/offer/assert-offers'
import { deleteOffer } from '@echo/firestore-test/offer/delete-offer'
import { unchecked_addOffer } from '@echo/firestore-test/offer/unchecked_add-offer'
import { LISTING_STATE_OFFERS_PENDING, LISTING_STATE_OPEN } from '@echo/model/constants/listing-states'
import { listingMockId } from '@echo/model-mocks/listing/listing-mock'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { offerMockFromJohnnycageId, offerMockToJohnnycageId } from '@echo/model-mocks/offer/offer-mock'
import { errorMessage } from '@echo/utils/helpers/error-message'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import { isNil } from 'ramda'

describe('CRUD - listing-offer - addListingOffer', () => {
  let createdOfferId: Nullable<string>
  let createdListingOfferId: Nullable<string>

  beforeAll(async () => {
    await assertOffers()
    await assertListingOffers()
  })
  afterAll(async () => {
    await assertOffers()
    await assertListingOffers()
  })
  beforeEach(() => {
    createdOfferId = undefined
    createdListingOfferId = undefined
  })
  afterEach(async () => {
    if (!isNil(createdOfferId)) {
      try {
        await deleteOffer(createdOfferId)
      } catch (e) {
        throw Error(`error deleting offer ${createdOfferId}: ${errorMessage(e)}`)
      }
    }
    if (!isNil(createdListingOfferId)) {
      try {
        await deleteListingOffer(createdListingOfferId)
      } catch (e) {
        throw Error(`error deleting listing offer ${createdListingOfferId}: ${errorMessage(e)}`)
      }
    }
  })

  it('throws if trying to add a listing offer for a listing that does not exist', async () => {
    await expect(
      addListingOffer({
        listingId: 'not-found',
        offerId: offerMockToJohnnycageId(),
        fulfillingStatus: ListingOfferFulfillingStatus.PARTIALLY
      })
    ).rejects.toBeDefined()
  })
  it('throws if trying to add a listing offer for an offer that does not exist', async () => {
    await expect(
      addListingOffer({
        listingId: listingMockId(),
        offerId: 'not-found',
        fulfillingStatus: ListingOfferFulfillingStatus.PARTIALLY
      })
    ).rejects.toBeDefined()
  })
  it('throws if trying to add a listing offer with a listingId and offerId already in the db', async () => {
    await expect(
      addListingOffer({
        listingId: listingMockId(),
        offerId: offerMockFromJohnnycageId(),
        fulfillingStatus: ListingOfferFulfillingStatus.PARTIALLY
      })
    ).rejects.toBeDefined()
  })
  it('add a listing offer', async () => {
    const listingId = listingMockId()
    const initialListingState = (await getListingById(listingId))!.state
    const { receiverItems, senderItems } = getOfferMockById(offerMockToJohnnycageId())
    const createdOfferNewDocument = await unchecked_addOffer(receiverItems, senderItems)
    createdOfferId = createdOfferNewDocument.id
    const createdListingOfferNewDocument = await addListingOffer({
      listingId,
      offerId: createdOfferId,
      fulfillingStatus: ListingOfferFulfillingStatus.COMPLETELY
    })
    createdListingOfferId = createdListingOfferNewDocument.id
    // get the new listing state and reset the listing state to its original value
    const newListingState = (await getListingById(listingId))!.state
    await unchecked_updateListing(listingId, { state: initialListingState })
    const foundListingOffer = await getListingOfferById(createdListingOfferId)
    expect(foundListingOffer).toStrictEqual(createdListingOfferNewDocument.data)
    // check if the listing state was correctly updated
    expect(newListingState).toEqual(
      initialListingState === LISTING_STATE_OPEN ? LISTING_STATE_OFFERS_PENDING : initialListingState
    )
  })
})
