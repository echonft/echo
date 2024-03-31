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
import { DEFAULT_EXPIRATION_TIME } from '@echo/model/constants/default-expiration-time'
import { LISTING_STATE_OFFERS_PENDING } from '@echo/model/constants/listing-states'
import { OFFER_STATE_OPEN } from '@echo/model/constants/offer-states'
import { type ListingState } from '@echo/model/types/listing-state'
import { getNftMockById } from '@echo/model-mocks/nft/get-nft-mock-by-id'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { expectDateNumberIs } from '@echo/utils-test/expect-date-number-is'
import { expectDateNumberIsNow } from '@echo/utils-test/expect-date-number-is-now'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import dayjs from 'dayjs'
import { head, toLower } from 'ramda'

describe('CRUD - offer - addOffer', () => {
  const listingId = 'jUzMtPGKM62mMhEcmbN4'
  let initialListingState: ListingState
  let createdOfferId: string
  let createdListingOfferId: string

  beforeAll(async () => {
    await assertOffers()
    await assertListingOffers()
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
  })

  it('throws if the offer is a duplicate', async () => {
    const { receiverItems, senderItems } = getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi')
    await expect(addOffer(senderItems, receiverItems)).rejects.toBeDefined()
  })

  it('add an offer', async () => {
    const senderItems = [{ amount: 1, nft: getNftMockById('kRE3UCfXWkJ33nwzj2X1') }]
    const receiverItems = [
      { amount: 1, nft: getNftMockById('8hHFadIrrooORfTOLkBg') },
      { amount: 1, nft: getNftMockById('iRZFKEujarikVjpiFAkE') }
    ]
    const createdOffer = await addOffer(senderItems, receiverItems)
    createdOfferId = createdOffer.id
    const newOffer = (await findOfferById(createdOfferId))!
    expect(newOffer.receiver).toStrictEqual({
      discord: {
        avatarUrl: 'https://cdn.discordapp.com/avatars/462798252543049728/6b3df6d9a8b5ab523fa24a71aca8160d.png',
        username: 'johnnycagewins'
      },
      username: 'johnnycagewins',
      wallet: {
        address: toLower('0x1E3918dD44F427F056be6C8E132cF1b5F42de59E'),
        chainId: 1
      }
    })
    expect(newOffer.receiverItems).toStrictEqual(receiverItems)
    expectDateNumberIsNow(newOffer.createdAt)
    expect(newOffer.sender).toStrictEqual({
      discord: {
        username: 'crewnft_',
        avatarUrl: 'https://cdn.discordapp.com/avatars/884593489189433364/6080eecbd12f0f7bb2299690661535cf.png'
      },
      username: 'crewnft_',
      wallet: {
        address: toLower('0xf672715f2bA85794659a7150e8C21F8d157bFe1D'),
        chainId: 1
      }
    })
    expect(newOffer.senderItems).toStrictEqual(senderItems)
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
