import { buildBaseOffer } from '@echo/model/helpers/offer/build-base-offer'
import { erc721NftToItem } from '@echo/model/mappers/nft/erc721-nft-to-item'
import { nftMockPx3, nftMockSpiral1 } from '@echo/model/mocks/nft-mock'
import type { OwnedErc721Nft } from '@echo/model/types/owned-erc721-nft'
import { describe, expect, it } from '@jest/globals'
import type { NonEmptyArray } from 'ramda'

// TODO test with fixed values, not with functions
describe('helpers - offer - buildBaseOffer', () => {
  it('should generate a base offer correctly', () => {
    const receiverNft = nftMockSpiral1 as OwnedErc721Nft
    const senderNft = nftMockPx3 as OwnedErc721Nft
    const sender = senderNft.owner
    const receiver = receiverNft.owner
    const senderOfferItems = [senderNft] as NonEmptyArray<OwnedErc721Nft>
    const receiverOfferItems = [receiverNft] as NonEmptyArray<OwnedErc721Nft>
    const expiresAt: number = Date.now()

    // Act
    const result = buildBaseOffer({ senderOfferItems, receiverOfferItems, expiresAt })

    // Assert
    expect(result.expiresAt).toBe(expiresAt)
    expect(result.receiverItems).toEqual([erc721NftToItem(receiverNft)])
    expect(result.senderItems).toEqual([erc721NftToItem(senderNft)])
    expect(result.sender).toEqual(sender)
    expect(result.receiver).toEqual(receiver)
  })
})
