import type { OfferItemRequest } from '@echo/api/types'
import { offerItemSchema } from '@server/validators/offer-item-schema'
import { assoc, dissoc, dissocPath } from 'ramda'

describe('validators - offerItemSchema', () => {
  const validRequest: OfferItemRequest = {
    amount: 1,
    nft: {
      id: 'nft-id'
    }
  }
  it('throws if amount is not valid', () => {
    expect(() => offerItemSchema.parse(dissoc('amount', validRequest))).toThrow()
    expect(() => offerItemSchema.parse(assoc('amount', 0, validRequest))).toThrow()
    expect(() => offerItemSchema.parse(assoc('amount', -1, validRequest))).toThrow()
    expect(() => offerItemSchema.parse(assoc('amount', 'amount', validRequest))).toThrow()
  })
  it('throws if nft is not valid', () => {
    expect(() => offerItemSchema.parse(dissoc('nft', validRequest))).toThrow()
    expect(() => offerItemSchema.parse(dissocPath(['nft', 'id'], validRequest))).toThrow()
    expect(() => offerItemSchema.parse(assoc('nft', {}, validRequest))).toThrow()
  })
  it('valid', () => {
    expect(offerItemSchema.parse(validRequest)).toStrictEqual(validRequest)
  })
})
