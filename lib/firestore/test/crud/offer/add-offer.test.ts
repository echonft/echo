import { ListingOfferFulfillingStatus } from '@echo/firestore/constants/listing-offer-fulfilling-status'
import { deleteListingOffer } from '@echo/firestore/crud/listing-offer/delete-listing-offer'
import { getListingOfferSnapshot } from '@echo/firestore/crud/listing-offer/get-listing-offer'
import { getListingOffersByOfferId } from '@echo/firestore/crud/listing-offer/get-listing-offers-by-offer-id'
import { getListingOffersForOffer } from '@echo/firestore/crud/listing-offer/get-listing-offers-for-offer'
import { getListingById } from '@echo/firestore/crud/listing/get-listing-by-id'
import { addOffer } from '@echo/firestore/crud/offer/add-offer'
import { deleteOffer } from '@echo/firestore/crud/offer/delete-offer'
import { getAllOffers } from '@echo/firestore/crud/offer/get-all-offers'
import { getOfferById } from '@echo/firestore/crud/offer/get-offer-by-id'
import { assertOfferIsNotADuplicate } from '@echo/firestore/helpers/offer/assert-offer-is-not-a-duplicate'
import { resetListings } from '@echo/firestore/utils/listing/reset-listings'
import { Expiration } from '@echo/model/constants/expiration'
import { ListingState } from '@echo/model/constants/listing-state'
import { OFFER_STATE_OPEN } from '@echo/model/constants/offer-states'
import { expirationToDate } from '@echo/model/helpers/expiration-to-date'
import { listingMockId } from '@echo/model/mocks/listing/listing-mock'
import { getNftMockById } from '@echo/model/mocks/nft/get-nft-mock-by-id'
import { nftMockPxCrewId, nftMockSpiralJohnny2Id, nftMockSpiralJohnnyId } from '@echo/model/mocks/nft/nft-mock'
import { getAllOfferMocks } from '@echo/model/mocks/offer/get-all-offer-mocks'
import { getOfferMockById } from '@echo/model/mocks/offer/get-offer-mock-by-id'
import { offerMockToJohnnycageId } from '@echo/model/mocks/offer/offer-mock'
import { getUserMockByUsername, userMockCrewUsername, userMockJohnnyUsername } from '@echo/model/mocks/user/user-mock'
import type { OwnedNft } from '@echo/model/types/nft/owned-nft'
import type { BaseOffer } from '@echo/model/types/offer/base-offer'
import type { Offer } from '@echo/model/types/offer/offer'
import { eqList } from '@echo/utils/fp/eq-list'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import dayjs from 'dayjs'
import { head, isNil, type NonEmptyArray, pick, pipe } from 'ramda'

describe('CRUD - offer - addOffer', () => {
  const listingId = listingMockId()
  let createdOfferId: Nullable<string>
  let createdListingOfferId: Nullable<string>
  beforeEach(() => {
    createdOfferId = undefined
    createdListingOfferId = undefined
  })
  afterEach(async () => {
    if (!isNil(createdOfferId)) {
      await deleteOffer(createdOfferId)
      await resetListings()
    }
    if (!isNil(createdListingOfferId)) {
      await deleteListingOffer(createdListingOfferId)
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
    await expect(addOffer({ baseOffer, idContract: offerMock.idContract })).rejects.toBeDefined()
    const offers = await getAllOffers()
    expect(eqList(offers, getAllOfferMocks())).toBeTruthy()
  })
  it('add an offer', async () => {
    const expiresAt = expirationToDate(Expiration.OneDay)
    const senderItems: NonEmptyArray<OwnedNft> = [getNftMockById(nftMockPxCrewId())]
    const receiverItems: NonEmptyArray<OwnedNft> = [
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
    const createdOffer = await addOffer({ baseOffer, idContract: '0xtest' })
    createdOfferId = createdOffer.id
    const newOffer: Offer = (await getOfferById(createdOfferId))!
    expect(newOffer.receiver).toStrictEqual(getUserMockByUsername(userMockJohnnyUsername()))
    expect(eqList(newOffer.receiverItems, receiverItems)).toBeTruthy()
    expect(newOffer.sender).toStrictEqual(getUserMockByUsername(userMockCrewUsername()))
    expect(eqList(newOffer.senderItems, senderItems)).toBeTruthy()
    expect(newOffer.state).toBe(OFFER_STATE_OPEN)
    expect(newOffer.idContract).toBe('0xtest')
    expect(dayjs.unix(newOffer.expiresAt).isAfter(expiresAt.subtract(1, 'minute'))).toBeTruthy()
    expect(dayjs.unix(newOffer.expiresAt).isBefore(expiresAt.add(1, 'minute'))).toBeTruthy()
    // check if offer has been added to tied listings
    const listingOffers = await getListingOffersForOffer(newOffer)
    expect(listingOffers.length).toBe(1)
    const foundListingOffers = await getListingOffersByOfferId(createdOfferId)
    expect(foundListingOffers.length).toBe(1)
    const createdListingOffer = head(foundListingOffers)!
    createdListingOfferId = (await getListingOfferSnapshot({ listingId, offerId: createdOfferId }))!.id
    expect(createdListingOffer.offerId).toEqual(createdOfferId)
    expect(createdListingOffer.listingId).toEqual(listingId)
    expect(createdListingOffer.fulfillingStatus).toEqual(ListingOfferFulfillingStatus.Partially)
    // check if the listing state was updated
    const newListingState = (await getListingById(listingId))!.state
    expect(newListingState).toEqual(ListingState.OffersPending)
  })
})
