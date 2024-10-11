import { assertItems } from '@echo/model/helpers/item/assert/assert-items'
import { describe, expect, it } from '@jest/globals'

describe('helpers - item - assert - assertItems', () => {
  it('throws if items is empty', () => {
    expect(() => {
      assertItems({ erc20: [], erc721: [], erc1155: [] })
    }).toThrow()
  })

  // TODO make these tests again + the check for same chain
  // it('throws if items have duplicate', () => {
  //   const offer = getOfferMockById(offerMockToJohnnycageId())
  //   const item = pipe<[Offer], NonEmptyArray<OwnedNft>, OwnedNft>(prop('senderItems'), head)(offer)
  //   const differentWalletItem = pipe(
  //     assoc('tokenId', 0),
  //     assocPath(['owner', 'wallet'], { address: '0xanotheraddress', chainId: 1 })
  //   )(item)
  //   expect(() => {
  //     assertItems([item, differentWalletItem])
  //   }).toThrow()
  // })
  //
  // it('does not throw if items is not empty and there are no duplicates', () => {
  //   const offer = getOfferMockById(offerMockToJohnnycageId())
  //   const item = offer.senderItems[0]
  //   const differentItem = assoc('tokenId', 0)(item)
  //   expect(() => {
  //     assertItems([item, differentItem])
  //   }).not.toThrow()
  // })
})
