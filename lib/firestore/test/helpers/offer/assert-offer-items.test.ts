import { assertOfferItems } from '../../../src/helpers/offer/assert-offer-items'
import { OfferItem } from '../../../src/types/model/offer-item'
import { getOfferMockById } from '../../mocks/get-offer-mock-by-id'
import { describe, expect, it } from '@jest/globals'
import { assocPath, pipe } from 'ramda'

describe('helpers - offer - assertOfferItems', () => {
  it('throws if not all the items are from the same collection', () => {
    const offer = getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi')
    const item = offer.senderItems[0]
    const differentCollectionItem = pipe(
      assocPath(['nft', 'id'], 'different-id'),
      assocPath(['nft', 'tokenId'], 0),
      assocPath(['nft', 'collection', 'id'], 'other-collection')
    )(item) as OfferItem
    expect(() => assertOfferItems([item, differentCollectionItem])).toThrow()
  })

  it('throws if some items have the same token id', () => {
    const offer = getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi')
    const item = offer.senderItems[0]
    const differentItemIdSameTokenId = assocPath(['nft', 'id'], 'different-id', item)
    expect(() => assertOfferItems([item, differentItemIdSameTokenId])).toThrow()
  })

  it('throws if some items have the same id', () => {
    const offer = getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi')
    const item = offer.senderItems[0]
    const differentItemTokenIdSameId = assocPath(['nft', 'tokenId'], 0, item)
    expect(() => assertOfferItems([item, differentItemTokenIdSameId])).toThrow()
  })

  it('throws if all items do not have the same wallet', () => {
    const offer = getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi')
    const item = offer.senderItems[0]
    const differentWalletItem = pipe(
      assocPath(['nft', 'id'], 'different-id'),
      assocPath(['nft', 'tokenId'], 0),
      assocPath(['nft', 'owner', 'wallet'], { address: '0xanotheraddress', chainId: 1 })
    )(item) as OfferItem
    expect(() => assertOfferItems([item, differentWalletItem])).toThrow()
  })

  it('does not throw if items are from the same collection, have the same wallet and all have different token ids and ids', () => {
    const offer = getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi')
    const item = offer.senderItems[0]
    const differentItem = pipe(
      assocPath(['nft', 'id'], 'different-id'),
      assocPath(['nft', 'tokenId'], 0)
    )(item) as OfferItem
    expect(() => assertOfferItems([item, differentItem])).not.toThrow()
  })
})
