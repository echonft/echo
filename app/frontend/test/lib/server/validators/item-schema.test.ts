import { type ItemRequest } from '@echo/api/types/requests/item-request'
import { itemSchema } from '@echo/frontend/lib/validators/item-schema'
import { assoc, dissoc, dissocPath } from 'ramda'

describe('validators - listingItemSchema', () => {
  const validRequest: ItemRequest = {
    amount: 1,
    nft: {
      id: 'nft-id'
    }
  }
  it('throws if amount is not valid', () => {
    expect(() => itemSchema.parse(dissoc('amount', validRequest))).toThrow()
    expect(() => itemSchema.parse(assoc('amount', 0, validRequest))).toThrow()
    expect(() => itemSchema.parse(assoc('amount', -1, validRequest))).toThrow()
    expect(() => itemSchema.parse(assoc('amount', 'amount', validRequest))).toThrow()
  })
  it('throws if nft is not valid', () => {
    expect(() => itemSchema.parse(dissoc('nft', validRequest))).toThrow()
    expect(() => itemSchema.parse(dissocPath(['nft', 'id'], validRequest))).toThrow()
    expect(() => itemSchema.parse(assoc('nft', {}, validRequest))).toThrow()
  })
  it('valid', () => {
    expect(itemSchema.parse(validRequest)).toStrictEqual(validRequest)
  })
})
