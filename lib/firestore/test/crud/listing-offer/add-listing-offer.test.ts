import { ListingOfferFulfillingStatus } from '@echo/firestore/constants/listing-offer-fulfilling-status'
import { addListingOffer } from '@echo/firestore/crud/listing-offer/add-listing-offer'
import { deleteListingOffer } from '@echo/firestore/crud/listing-offer/delete-listing-offer'
import { getListingOfferById } from '@echo/firestore/crud/listing-offer/get-listing-offer-by-id'
import { getListingById } from '@echo/firestore/crud/listing/get-listing-by-id'
import { deleteOffer } from '@echo/firestore/crud/offer/delete-offer'
import { updateListing } from '@echo/firestore/utils/listing/update-listing'
import { unchecked_addOffer } from '@echo/firestore/utils/offer/unchecked_add-offer'
import { ListingState } from '@echo/model/constants/listing-state'
import { listingMockId, listingMockSlug } from '@echo/model/mocks/listing/listing-mock'
import { getOfferMockById } from '@echo/model/mocks/offer/get-offer-mock-by-id'
import { offerMockFromJohnnycageId, offerMockToJohnnycageId } from '@echo/model/mocks/offer/offer-mock'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { isNil } from 'ramda'

describe('CRUD - listing-offer - addListingOffer', () => {
  let createdOfferId: Nullable<string>
  let createdListingOfferId: Nullable<string>
  beforeEach(() => {
    createdOfferId = undefined
    createdListingOfferId = undefined
  })
  afterEach(async () => {
    if (!isNil(createdOfferId)) {
      await deleteOffer(createdOfferId)
    }
    if (!isNil(createdListingOfferId)) {
      await deleteListingOffer(createdListingOfferId)
    }
  })

  it('throws if trying to add a listing offer for a listing that does not exist', async () => {
    await expect(
      addListingOffer({
        listingId: 'not-found',
        offerId: offerMockToJohnnycageId(),
        fulfillingStatus: ListingOfferFulfillingStatus.Partially
      })
    ).rejects.toBeDefined()
  })
  it('throws if trying to add a listing offer for an offer that does not exist', async () => {
    await expect(
      addListingOffer({
        listingId: listingMockId(),
        offerId: 'not-found',
        fulfillingStatus: ListingOfferFulfillingStatus.Partially
      })
    ).rejects.toBeDefined()
  })
  it('throws if trying to add a listing offer with a listingId and offerId already in the db', async () => {
    await expect(
      addListingOffer({
        listingId: listingMockId(),
        offerId: offerMockFromJohnnycageId(),
        fulfillingStatus: ListingOfferFulfillingStatus.Partially
      })
    ).rejects.toBeDefined()
  })
  it('add a listing offer', async () => {
    const listingId = listingMockId()
    const slug = listingMockSlug()
    const initialListingState = (await getListingById(listingId))!.state
    const { receiverItems, senderItems } = getOfferMockById(offerMockToJohnnycageId())
    const createdOfferNewDocument = await unchecked_addOffer(receiverItems, senderItems)
    createdOfferId = createdOfferNewDocument.id
    const createdListingOfferNewDocument = await addListingOffer({
      listingId,
      offerId: createdOfferId,
      fulfillingStatus: ListingOfferFulfillingStatus.Completely
    })
    createdListingOfferId = createdListingOfferNewDocument.id
    // get the new listing state and reset the listing state to its original value
    const newListingState = (await getListingById(listingId))!.state
    await updateListing(slug, { state: initialListingState })
    const foundListingOffer = await getListingOfferById(createdListingOfferId)
    expect(foundListingOffer).toStrictEqual(createdListingOfferNewDocument.data)
    // check if the listing state was correctly updated
    expect(newListingState).toEqual(
      initialListingState === ListingState.Open ? ListingState.OffersPending : initialListingState
    )
  })
})
