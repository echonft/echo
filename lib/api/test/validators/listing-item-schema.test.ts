import { listingItemSchema } from '../../src/validators/listing-item-schema'
import { ListingItemRequest } from '@echo/api-public'
import { describe, expect, it } from '@jest/globals'
import { assoc, dissoc, dissocPath } from 'ramda'

describe('validators - listingItemSchema', () => {
  const validRequest: ListingItemRequest = {
    amount: 1,
    nft: {
      id: 'nft-id'
    }
  }
  it('throws if amount is not valid', () => {
    expect(() => listingItemSchema.parse(dissoc('amount', validRequest))).toThrow()
    expect(() => listingItemSchema.parse(assoc('amount', 0, validRequest))).toThrow()
    expect(() => listingItemSchema.parse(assoc('amount', -1, validRequest))).toThrow()
    expect(() => listingItemSchema.parse(assoc('amount', 'amount', validRequest))).toThrow()
  })
  it('throws if nft is not valid', () => {
    expect(() => listingItemSchema.parse(dissoc('nft', validRequest))).toThrow()
    expect(() => listingItemSchema.parse(dissocPath(['nft', 'id'], validRequest))).toThrow()
    expect(() => listingItemSchema.parse(assoc('nft', {}, validRequest))).toThrow()
  })
  it('valid', () => {
    expect(listingItemSchema.parse(validRequest)).toStrictEqual(validRequest)
  })
})
