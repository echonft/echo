import { assertOfferItems } from '@echo/model/helpers/offer/assert/assert-offer-items'
import { assertOfferItemsAreSameChain } from '@echo/model/helpers/offer/assert/assert-offer-items-are-same-chain'
import { type OfferItem } from '@echo/model/types/offer-item'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { describe, expect, it } from '@jest/globals'
import { assocPath, pipe } from 'ramda'

describe('helpers - offer - assert - assertOfferItemsAreSameChain', () => {
  it('throws if items are empty', () => {
    expect(() => assertOfferItemsAreSameChain([])).toThrow()
  })

  it('throws if items are not all on the same chain', () => {
    const offer = getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi')
    const item = offer.senderItems[0]
    const differentChainItem = assocPath(['nft', 'collection', 'contract', 'chainId'], 123, item)
    expect(() => assertOfferItemsAreSameChain([item, differentChainItem])).toThrow()
  })

  it('does not throw if items are all on the same chain', () => {
    const offer = getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi')
    const item = offer.senderItems[0]
    const differentItem = pipe(
      assocPath(['nft', 'id'], 'different-id'),
      assocPath(['nft', 'tokenId'], 0)
    )(item) as OfferItem
    expect(() => assertOfferItems([item, differentItem])).not.toThrow()
  })
})
