import { findNftById } from '@echo/firestore/crud/nft/find-nft-by-id'
import { switchOfferItemsOwners } from '@echo/firestore/crud/offer/switch-offer-items-owners'
import { assertNfts } from '@echo/firestore-test/nft/assert-nfts'
import { unchecked_updateNft } from '@echo/firestore-test/nft/unchecked_update-nft'
import { getNftMockById } from '@echo/model-mocks/nft/get-nft-mock-by-id'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { concat, map, path } from 'ramda'

describe('CRUD - offer - acceptOffer', () => {
  let nftIds: string[] = []
  beforeAll(async () => {
    await assertNfts()
  })
  afterAll(async () => {
    // reset the NFTs with their original data
    for (const nftId of nftIds) {
      await unchecked_updateNft(nftId, getNftMockById(nftId))
    }
    await assertNfts()
  })
  it('ownership of the items are inverted', async () => {
    const offer = getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi')
    const { receiverItems, receiver, senderItems, sender } = offer
    nftIds = concat(map(path(['nft', 'id']), receiverItems), map(path(['nft', 'id']), senderItems)) as string[]
    await switchOfferItemsOwners(offer)
    for (const item of receiverItems) {
      const nft = (await findNftById(item.nft.id))!
      expect(nft.owner).toStrictEqual(sender)
    }
    for (const item of senderItems) {
      const nft = (await findNftById(item.nft.id))!
      expect(nft.owner).toStrictEqual(receiver)
    }
  })
})
