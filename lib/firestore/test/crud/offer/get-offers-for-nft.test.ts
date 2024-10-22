import { getOffersForNft } from '@echo/firestore/crud/offer/get-offers-for-nft'
import { getNftMockById } from '@echo/model/mocks/nft/get-nft-mock-by-id'
import { nftMockPxCrewId, nftMockPxJohnny2Id, nftMockSpiralJohnny2Id } from '@echo/model/mocks/nft/nft-mock'
import { getAllOfferMocks } from '@echo/model/mocks/offer/get-all-offer-mocks'
import { getOfferMockById } from '@echo/model/mocks/offer/get-offer-mock-by-id'
import {
  offerMockFromJohnnycageId,
  offerMockFromJohnnycageSlug,
  offerMockToJohnnycageId
} from '@echo/model/mocks/offer/offer-mock'
import { resetOffer } from '@echo/test/firestore/crud/offer/reset-offer'
import { updateOffer } from '@echo/test/firestore/crud/offer/update-offer'
import { afterEach, describe, expect, it } from '@jest/globals'
import { head, last, omit, pipe } from 'ramda'

describe('CRUD - offer - getOffersForNft', () => {
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
    for (const offer of getAllOfferMocks()) {
      await updateOffer(offer.slug, { locked: false })
    }
    let nft = pipe(nftMockSpiralJohnny2Id, getNftMockById)()
    let offers = await getOffersForNft(nft)
    expect(offers.length).toBe(1)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(pipe(head, omit(['locked']))(offers)).toStrictEqual(
      pipe(offerMockFromJohnnycageId, getOfferMockById, omit(['locked']))()
    )
    nft = pipe(nftMockPxCrewId, getNftMockById)()
    offers = await getOffersForNft(nft)
    expect(offers.length).toBe(2)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(pipe(head, omit(['locked']))(offers)).toStrictEqual(
      pipe(offerMockFromJohnnycageId, getOfferMockById, omit(['locked']))()
    )
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(pipe(last, omit(['locked']))(offers)).toStrictEqual(
      pipe(offerMockToJohnnycageId, getOfferMockById, omit(['locked']))()
    )
  })
  it('only returns the offers that are not locked', async () => {
    const nft = pipe(nftMockSpiralJohnny2Id, getNftMockById)()
    const slug = offerMockFromJohnnycageSlug()
    await updateOffer(slug, { locked: true })
    await expect(getOffersForNft(nft)).resolves.toEqual([])
  })
})
