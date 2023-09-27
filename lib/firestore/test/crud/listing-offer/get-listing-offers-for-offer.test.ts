import { getListingOffersForOffer } from '@echo/firestore/crud/listing-offer/get-listing-offers-for-offer'
import { ListingOfferFulfillingStatus } from '@echo/firestore/types/model/listing-offer/listing-offer-fulfilling-status'
import type { FirestoreOffer } from '@echo/firestore/types/model/offer/firestore-offer'
import type { FirestoreOfferItem } from '@echo/firestore/types/model/offer/firestore-offer-item'
import { getNftMockById } from '@echo/firestore-mocks/nft/get-nft-mock-by-id'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'
import { head } from 'ramda'

describe('CRUD - listing-offer - getListingOffersForOffer', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })

  it('returns an empty array if the offer items do not match any listing targets', async () => {
    const receiverItems: FirestoreOfferItem[] = [
      { amount: 1, nft: getNftMockById('8hHFadIrrooORfTOLkBg') },
      { amount: 1, nft: getNftMockById('iRZFKEujarikVjpiFAkE') }
    ]
    const senderItems: FirestoreOfferItem[] = [{ amount: 1, nft: getNftMockById('8hHFadIrrooORfTOLkBg') }]
    const offer = { id: 'offer-id', receiverItems, senderItems } as FirestoreOffer
    const listings = await getListingOffersForOffer(offer)
    expect(listings).toEqual([])
  })

  it('returns an empty array if the offer items do not match any listing items', async () => {
    const receiverItems: FirestoreOfferItem[] = [
      { amount: 1, nft: getNftMockById('QFjMRNChUAHNswkRADXh') },
      { amount: 1, nft: getNftMockById('XiDa6k2P7gxXCKSxn2wq') },
      { amount: 1, nft: getNftMockById('kRE3UCfXWkJ33nwzj2X1') }
    ]
    const senderItems: FirestoreOfferItem[] = [{ amount: 1, nft: getNftMockById('QFjMRNChUAHNswkRADXh') }]
    const offer = { id: 'offer-id', receiverItems, senderItems } as FirestoreOffer
    const listings = await getListingOffersForOffer(offer)
    expect(listings).toEqual([])
  })

  it('returns partially fulfilled listing offers when not all listing items are in the offer', async () => {
    const offerId = 'offer-id'
    const listingId = 'jUzMtPGKM62mMhEcmbN4'
    const receiverItems: FirestoreOfferItem[] = [
      { amount: 1, nft: getNftMockById('QFjMRNChUAHNswkRADXh') },
      { amount: 1, nft: getNftMockById('XiDa6k2P7gxXCKSxn2wq') },
      { amount: 1, nft: getNftMockById('kRE3UCfXWkJ33nwzj2X1') }
    ]
    const senderItems: FirestoreOfferItem[] = [{ amount: 1, nft: getNftMockById('8hHFadIrrooORfTOLkBg') }]
    const offer = { id: offerId, receiverItems, senderItems } as FirestoreOffer
    const listingOffers = await getListingOffersForOffer(offer)
    expect(listingOffers.length).toEqual(1)
    const listingOffer = head(listingOffers)!
    expect(listingOffer.offerId).toEqual(offerId)
    expect(listingOffer.listingId).toEqual(listingId)
    expect(listingOffer.fulfillingStatus).toEqual(ListingOfferFulfillingStatus.PARTIALLY)
  })

  it('returns partially fulfilled listing offers when not all listing targets are in the offer', async () => {
    const offerId = 'offer-id'
    const listingId = 'jUzMtPGKM62mMhEcmbN4'
    const receiverItems: FirestoreOfferItem[] = [
      { amount: 1, nft: getNftMockById('QFjMRNChUAHNswkRADXh') },
      { amount: 1, nft: getNftMockById('XiDa6k2P7gxXCKSxn2wq') }
    ]
    const senderItems: FirestoreOfferItem[] = [
      { amount: 1, nft: getNftMockById('8hHFadIrrooORfTOLkBg') },
      { amount: 1, nft: getNftMockById('iRZFKEujarikVjpiFAkE') }
    ]
    const offer = { id: offerId, receiverItems, senderItems } as FirestoreOffer
    const listingOffers = await getListingOffersForOffer(offer)
    expect(listingOffers.length).toEqual(1)
    const listingOffer = head(listingOffers)!
    expect(listingOffer.offerId).toEqual(offerId)
    expect(listingOffer.listingId).toEqual(listingId)
    expect(listingOffer.fulfillingStatus).toEqual(ListingOfferFulfillingStatus.PARTIALLY)
  })

  it('returns completely fulfilled listing offers', async () => {
    const offerId = 'offer-id'
    const listingId = 'jUzMtPGKM62mMhEcmbN4'
    const receiverItems: FirestoreOfferItem[] = [
      { amount: 1, nft: getNftMockById('8hHFadIrrooORfTOLkBg') },
      { amount: 1, nft: getNftMockById('iRZFKEujarikVjpiFAkE') }
    ]
    const senderItems: FirestoreOfferItem[] = [
      { amount: 1, nft: getNftMockById('QFjMRNChUAHNswkRADXh') },
      { amount: 1, nft: getNftMockById('XiDa6k2P7gxXCKSxn2wq') },
      { amount: 1, nft: getNftMockById('kRE3UCfXWkJ33nwzj2X1') }
    ]
    const offer = { id: offerId, receiverItems, senderItems } as FirestoreOffer
    const listingOffers = await getListingOffersForOffer(offer)
    expect(listingOffers.length).toEqual(1)
    const listingOffer = head(listingOffers)!
    expect(listingOffer.offerId).toEqual(offerId)
    expect(listingOffer.listingId).toEqual(listingId)
    expect(listingOffer.fulfillingStatus).toEqual(ListingOfferFulfillingStatus.COMPLETELY)
  })
})
