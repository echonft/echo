import { getListingById } from '@echo/firestore/crud/listing/get-listing-by-id'
import { getListingOfferSnapshot } from '@echo/firestore/crud/listing-offer/get-listing-offer'
import { getListingOffersByOfferId } from '@echo/firestore/crud/listing-offer/get-listing-offers-by-offer-id'
import { getListingOffersForOffer } from '@echo/firestore/crud/listing-offer/get-listing-offers-for-offer'
import { addOffer } from '@echo/firestore/crud/offer/add-offer'
import { getOfferById } from '@echo/firestore/crud/offer/get-offer-by-id'
import { assertOfferIsNotADuplicate } from '@echo/firestore/helpers/offer/assert/assert-offer-is-not-a-duplicate'
import { ListingOfferFulfillingStatus } from '@echo/firestore/types/model/listing-offer/listing-offer-fulfilling-status'
import { unchecked_updateListing } from '@echo/firestore-test/listing/unchecked_update-listing'
import { assertListingOffers } from '@echo/firestore-test/listing-offer/assert-listing-offers'
import { deleteListingOffer } from '@echo/firestore-test/listing-offer/delete-listing-offer'
import { assertOffers } from '@echo/firestore-test/offer/assert-offers'
import { deleteOffer } from '@echo/firestore-test/offer/delete-offer'
import { getAllOffers } from '@echo/firestore-test/offer/get-all-offers'
import { DEFAULT_EXPIRATION_TIME } from '@echo/model/constants/default-expiration-time'
import { LISTING_STATE_OFFERS_PENDING } from '@echo/model/constants/listing-states'
import { OFFER_STATE_OPEN } from '@echo/model/constants/offer-states'
import type { BaseOffer } from '@echo/model/types/base-offer'
import type { Nft } from '@echo/model/types/nft'
import { getListingMockById } from '@echo/model-mocks/listing/get-listing-mock-by-id'
import { listingMockId } from '@echo/model-mocks/listing/listing-mock'
import { getNftMockById } from '@echo/model-mocks/nft/get-nft-mock-by-id'
import { nftMockPxCrewId, nftMockSpiralJohnny2Id, nftMockSpiralJohnnyId } from '@echo/model-mocks/nft/nft-mock'
import { getAllOfferMocks } from '@echo/model-mocks/offer/get-all-offer-mocks'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { offerMockToJohnnycageId } from '@echo/model-mocks/offer/offer-mock'
import { getUserMockByUsername, userMockCrewUsername, userMockJohnnyUsername } from '@echo/model-mocks/user/user-mock'
import { eqListContent } from '@echo/utils/fp/eq-list-content'
import { errorMessage } from '@echo/utils/helpers/error-message'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import type { Nullable } from '@echo/utils/types/nullable'
import { expectDateNumberIs } from '@echo/utils-test/expect-date-number-is'
import { expectDateNumberIsNow } from '@echo/utils-test/expect-date-number-is-now'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import dayjs from 'dayjs'
import { head, isNil, pick, pipe } from 'ramda'

describe('CRUD - offer - addOffer', () => {
  const listingId = listingMockId()
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
      try {
        await unchecked_updateListing(listingId, getListingMockById(listingId))
      } catch (e) {
        throw Error(`error updating listing ${listingId} to its original state: ${errorMessage(e)}`)
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

  it('assertOfferIsNotADuplicate', async () => {
    await expect(
      pipe(
        getOfferMockById,
        pick(['senderItems', 'receiverItems']),
        assertOfferIsNotADuplicate
      )(offerMockToJohnnycageId())
    ).rejects.toBeDefined()
  })
  it('throws if the offer is a duplicate', async () => {
    const offerMock = getOfferMockById(offerMockToJohnnycageId())
    const baseOffer = pick(
      ['expiresAt', 'receiver', 'receiverItems', 'receiverItems', 'sender', 'senderItems'],
      offerMock
    )
    await expect(addOffer(baseOffer, offerMock.idContract)).rejects.toBeDefined()
    const offers = await getAllOffers()
    expect(eqListContent(offers, getAllOfferMocks())).toBeTruthy()
  })
  it('add an offer', async () => {
    const expiresAt = dayjs().add(DEFAULT_EXPIRATION_TIME, 'day')
    const senderItems: NonEmptyArray<Nft> = [getNftMockById(nftMockPxCrewId())]
    const receiverItems: NonEmptyArray<Nft> = [
      getNftMockById(nftMockSpiralJohnnyId()),
      getNftMockById(nftMockSpiralJohnny2Id())
    ]
    const baseOffer: BaseOffer = {
      expiresAt: expiresAt.unix(),
      receiver: head(receiverItems).owner,
      receiverItems,
      sender: head(senderItems).owner,
      senderItems
    }
    const createdOffer = await addOffer(baseOffer, '0xTEST')
    createdOfferId = createdOffer.id
    const newOffer = (await getOfferById(createdOfferId))!
    expect(newOffer.receiver).toStrictEqual(getUserMockByUsername(userMockJohnnyUsername()))
    expect(eqListContent(newOffer.receiverItems, receiverItems)).toBeTruthy()
    expectDateNumberIsNow(newOffer.createdAt)
    expect(newOffer.sender).toStrictEqual(getUserMockByUsername(userMockCrewUsername()))
    expect(eqListContent(newOffer.senderItems, senderItems)).toBeTruthy()
    expect(newOffer.state).toBe(OFFER_STATE_OPEN)
    expect(newOffer.idContract).toBe('0xTEST')
    expectDateNumberIsNow(newOffer.updatedAt)
    expectDateNumberIs(newOffer.expiresAt)(expiresAt)
    // check if offer has been added to tied listings
    const listingOffers = await getListingOffersForOffer(newOffer)
    expect(listingOffers.length).toBe(1)
    const foundListingOffers = await getListingOffersByOfferId(createdOfferId)
    expect(foundListingOffers.length).toBe(1)
    const createdListingOffer = head(foundListingOffers)!
    createdListingOfferId = (await getListingOfferSnapshot({ listingId, offerId: createdOfferId }))!.id
    expect(createdListingOffer.offerId).toEqual(createdOfferId)
    expect(createdListingOffer.listingId).toEqual(listingId)
    expect(createdListingOffer.fulfillingStatus).toEqual(ListingOfferFulfillingStatus.PARTIALLY)
    // check if the listing state was updated
    const newListingState = (await getListingById(listingId))!.state
    expect(newListingState).toEqual(LISTING_STATE_OFFERS_PENDING)
  })
})
