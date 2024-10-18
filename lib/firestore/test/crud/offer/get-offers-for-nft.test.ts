import { getOffersForNft } from '@echo/firestore/crud/offer/get-offers-for-nft'
import { resetOffer } from '@echo/firestore/utils/offer/reset-offer'
import { updateOffer } from '@echo/firestore/utils/offer/update-offer'
import { OfferState } from '@echo/model/constants/offer-state'
import { getNftMockById } from '@echo/model/mocks/nft/get-nft-mock-by-id'
import { nftMockPxCrewId, nftMockPxJohnny2Id, nftMockSpiralJohnny2Id } from '@echo/model/mocks/nft/nft-mock'
import { getAllOfferMocks } from '@echo/model/mocks/offer/get-all-offer-mocks'
import { getOfferMockById } from '@echo/model/mocks/offer/get-offer-mock-by-id'
import {
  offerMockFromJohnnycageId,
  offerMockFromJohnnycageSlug,
  offerMockToJohnnycageId
} from '@echo/model/mocks/offer/offer-mock'
import type { Offer } from '@echo/model/types/offer/offer'
import { futureDate } from '@echo/utils/helpers/future-date'
import { pastDate } from '@echo/utils/helpers/past-date'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { assoc, pipe } from 'ramda'

describe('CRUD - offer - getOffersForNft', () => {
  function updateOfferMockToStateOpen(offer: Offer): Offer {
    return pipe(assoc('state', OfferState.Open), assoc('readOnly', false))(offer)
  }
  beforeEach(async () => {
    const offers = getAllOfferMocks()
    for (const offer of offers) {
      await updateOffer(offer.slug, { state: OfferState.Open, expiresAt: futureDate() })
    }
  })
  afterEach(async () => {
    const offers = getAllOfferMocks()
    for (const offer of offers) {
      await resetOffer(offer.slug)
    }
  })
  it('returns an empty array if there are no offers with the given NFT', async () => {
    const nft = pipe(nftMockPxJohnny2Id, getNftMockById)()
    const offers = await getOffersForNft(nft)
    expect(offers).toEqual([])
  })
  it('returns the offers with the given NFT as an item', async () => {
    let nft = pipe(nftMockSpiralJohnny2Id, getNftMockById)()
    let offers = await getOffersForNft(nft)
    expect(offers.length).toBe(1)
    // expect(offers[0]).toStrictEqual(pipe(offerMockFromJohnnycageId, getOfferMockById, updateOfferMockToStateOpen)())
    nft = pipe(nftMockPxCrewId, getNftMockById)()
    offers = await getOffersForNft(nft)
    expect(offers.length).toBe(2)
    expect(offers[0]).toStrictEqual(pipe(offerMockFromJohnnycageId, getOfferMockById, updateOfferMockToStateOpen)())
    expect(offers[1]).toStrictEqual(pipe(offerMockToJohnnycageId, getOfferMockById, updateOfferMockToStateOpen)())
  })
  it('only returns the offers that are not read only', async () => {
    const nft = pipe(nftMockSpiralJohnny2Id, getNftMockById)()
    const slug = offerMockFromJohnnycageSlug()
    await updateOffer(slug, { state: OfferState.Rejected })
    await expect(getOffersForNft(nft)).resolves.toEqual([])
    await updateOffer(slug, { state: OfferState.Completed })
    await expect(getOffersForNft(nft)).resolves.toEqual([])
    await updateOffer(slug, { state: OfferState.Expired })
    await expect(getOffersForNft(nft)).resolves.toEqual([])
    await updateOffer(slug, { state: OfferState.Cancelled })
    await expect(getOffersForNft(nft)).resolves.toEqual([])
  })
  it('only returns the offers that are not expired', async () => {
    const nft = pipe(nftMockSpiralJohnny2Id, getNftMockById)()
    await updateOffer(offerMockFromJohnnycageSlug(), { expiresAt: pastDate() })
    await expect(getOffersForNft(nft)).resolves.toEqual([])
  })
})
