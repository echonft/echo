import { getOffersForNft } from '@echo/firestore/crud/offer/get-offers-for-nft'
import {
  offerDocumentMockFromJohnnycage,
  offerDocumentMockToJohnnycage
} from '@echo/firestore/mocks/offer-document-mock'
import { nftMockPx3, nftMockSpiral2 } from '@echo/model/mocks/nft-mock'
import { resetOffer } from '@echo/test/firestore/crud/offer/reset-offer'
import { updateOffer } from '@echo/test/firestore/crud/offer/update-offer'
import { offerDocumentMocks } from '@echo/test/firestore/mocks'
import { afterEach, describe, expect, it } from '@jest/globals'
import { head, last, omit, pipe } from 'ramda'

describe('CRUD - offer - getOffersForNft', () => {
  afterEach(async () => {
    for (const offer of offerDocumentMocks) {
      await resetOffer(offer.slug)
    }
  })
  it('returns an empty array if there are no offers with the given NFT', async () => {
    const offers = await getOffersForNft(nftMockSpiral2)
    expect(offers).toEqual([])
  })
  it('returns the offers with the given NFT as an item', async () => {
    for (const offer of offerDocumentMocks) {
      await updateOffer(offer.slug, { locked: false })
    }
    let offers = await getOffersForNft(nftMockSpiral2)
    expect(offers.length).toBe(1)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(pipe(head, omit(['locked']))(offers)).toStrictEqual(omit(['locked'], offerDocumentMockFromJohnnycage))
    offers = await getOffersForNft(nftMockPx3)
    expect(offers.length).toBe(2)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(pipe(head, omit(['locked']))(offers)).toStrictEqual(omit(['locked'], offerDocumentMockFromJohnnycage))
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(pipe(last, omit(['locked']))(offers)).toStrictEqual(omit(['locked'], offerDocumentMockToJohnnycage))
  })
  it('only returns the offers that are not locked', async () => {
    const nft = nftMockSpiral2
    const slug = offerDocumentMockFromJohnnycage.slug
    await updateOffer(slug, { locked: true })
    await expect(getOffersForNft(nft)).resolves.toEqual([])
  })
})
