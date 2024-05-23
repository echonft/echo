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
import { getListingMockById } from '@echo/model-mocks/listing/get-listing-mock-by-id'
import { LISTING_MOCK_ID } from '@echo/model-mocks/listing/listing-mock'
import { getNftMockById } from '@echo/model-mocks/nft/get-nft-mock-by-id'
import { getAllOfferMocks } from '@echo/model-mocks/offer/get-all-offer-mocks'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { OFFER_MOCK_TO_JOHNNYCAGE_ID } from '@echo/model-mocks/offer/offer-mock'
import { eqListContent } from '@echo/utils/fp/eq-list-content'
import { errorMessage } from '@echo/utils/helpers/error-message'
import type { Nullable } from '@echo/utils/types/nullable'
import { expectDateNumberIs } from '@echo/utils-test/expect-date-number-is'
import { expectDateNumberIsNow } from '@echo/utils-test/expect-date-number-is-now'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import dayjs from 'dayjs'
import { head, isNil, pick, pipe, toLower } from 'ramda'

describe('CRUD - offer - addOffer', () => {
  const listingId = LISTING_MOCK_ID
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
      )(OFFER_MOCK_TO_JOHNNYCAGE_ID)
    ).rejects.toBeDefined()
  })
  it('throws if the offer is a duplicate', async () => {
    const { receiverItems, senderItems } = getOfferMockById(OFFER_MOCK_TO_JOHNNYCAGE_ID)
    await expect(addOffer(senderItems, receiverItems)).rejects.toBeDefined()
    const offers = await getAllOffers()
    expect(eqListContent(offers, getAllOfferMocks())).toBeTruthy()
  })
  it('add an offer', async () => {
    const senderItems = [getNftMockById('kRE3UCfXWkJ33nwzj2X1')]
    const receiverItems = [getNftMockById('8hHFadIrrooORfTOLkBg'), getNftMockById('iRZFKEujarikVjpiFAkE')]
    const createdOffer = await addOffer(senderItems, receiverItems)
    createdOfferId = createdOffer.id
    const newOffer = (await getOfferById(createdOfferId))!
    expect(newOffer.receiver).toStrictEqual({
      discord: {
        avatarUrl: 'https://cdn.discordapp.com/avatars/462798252543049728/6b3df6d9a8b5ab523fa24a71aca8160d.png',
        username: 'johnnycagewins'
      },
      username: 'johnnycagewins',
      wallet: {
        address: toLower('0x1E3918dD44F427F056be6C8E132cF1b5F42de59E'),
        chain: 'ethereum'
      }
    })
    expect(eqListContent(newOffer.receiverItems, receiverItems)).toBeTruthy()
    expectDateNumberIsNow(newOffer.createdAt)
    expect(newOffer.sender).toStrictEqual({
      discord: {
        username: 'crewnft_',
        avatarUrl: 'https://cdn.discordapp.com/avatars/884593489189433364/6080eecbd12f0f7bb2299690661535cf.png'
      },
      username: 'crewnft_',
      wallet: {
        address: toLower('0xf672715f2bA85794659a7150e8C21F8d157bFe1D'),
        chain: 'ethereum'
      }
    })
    expect(eqListContent(newOffer.senderItems, senderItems)).toBeTruthy()
    expect(newOffer.state).toBe(OFFER_STATE_OPEN)
    expect(newOffer.idContract).toBe('0xTEST')
    expectDateNumberIsNow(newOffer.updatedAt)
    expectDateNumberIs(newOffer.expiresAt)(dayjs().add(DEFAULT_EXPIRATION_TIME, 'day'))
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
