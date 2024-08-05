import { assertItems } from '@echo/model/helpers/item/assert/assert-items'
import { getOfferMockById } from '@echo/model/mocks/offer/get-offer-mock-by-id'
import { offerMockToJohnnycageId } from '@echo/model/mocks/offer/offer-mock'
import type { OwnedNft } from '@echo/model/types/nft'
import type { Offer } from '@echo/model/types/offer'
import { describe, expect, it } from '@jest/globals'
import { assoc, assocPath, head, type NonEmptyArray, pipe, prop } from 'ramda'

describe('helpers - item - assert - assertItems', () => {
  it('throws if some items have the same token id', () => {
    const offer = getOfferMockById(offerMockToJohnnycageId())
    const item = pipe<[Offer], NonEmptyArray<OwnedNft>, OwnedNft>(prop('senderItems'), head)(offer)
    const differentItemIdSameTokenId = assoc('name', 'different-name', item)
    expect(() => {
      assertItems([item, differentItemIdSameTokenId])
    }).toThrow()
  })

  it('throws if all items do not have the same wallet', () => {
    const offer = getOfferMockById(offerMockToJohnnycageId())
    const item = pipe<[Offer], NonEmptyArray<OwnedNft>, OwnedNft>(prop('senderItems'), head)(offer)
    const differentWalletItem = pipe(
      assoc('tokenId', 0),
      assocPath(['owner', 'wallet'], { address: '0xanotheraddress', chainId: 1 })
    )(item)
    expect(() => {
      assertItems([item, differentWalletItem])
    }).toThrow()
  })

  it('does not throw if items are from the same collection, have the same wallet and all have different token ids and ids', () => {
    const offer = getOfferMockById(offerMockToJohnnycageId())
    const item = offer.senderItems[0]
    const differentItem = assoc('tokenId', 0)(item)
    expect(() => {
      assertItems([item, differentItem])
    }).not.toThrow()
  })
})
