import { listingTargetSchema } from '../../src/lib/server/validators/listing-target-schema'
import { ListingTargetRequest } from '@echo/api'
import { assoc, dissoc, dissocPath } from 'ramda'

describe('validators - listingTargetSchema', () => {
  const validRequest: ListingTargetRequest = {
    amount: 1,
    collection: {
      id: 'collection-id'
    }
  }
  it('throws if amount is not valid', () => {
    expect(() => listingTargetSchema.parse(dissoc('amount', validRequest))).toThrow()
    expect(() => listingTargetSchema.parse(assoc('amount', 0, validRequest))).toThrow()
    expect(() => listingTargetSchema.parse(assoc('amount', -1, validRequest))).toThrow()
    expect(() => listingTargetSchema.parse(assoc('amount', 'amount', validRequest))).toThrow()
  })
  it('throws if nft is not valid', () => {
    expect(() => listingTargetSchema.parse(dissoc('collection', validRequest))).toThrow()
    expect(() => listingTargetSchema.parse(dissocPath(['collection', 'id'], validRequest))).toThrow()
    expect(() => listingTargetSchema.parse(assoc('collection', {}, validRequest))).toThrow()
  })
  it('valid', () => {
    expect(listingTargetSchema.parse(validRequest)).toStrictEqual(validRequest)
  })
})
