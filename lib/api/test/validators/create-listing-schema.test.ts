import { createListingSchema } from '../../src/validators/create-listing-schema'
import { CreateListingRequest } from '@echo/api-public'
import { describe, expect, it } from '@jest/globals'
import { assoc, dissoc } from 'ramda'

describe('validators - createListingSchema', () => {
  const validRequest: CreateListingRequest = {
    items: [
      {
        amount: 1,
        nft: {
          id: 'nft-id'
        }
      }
    ],
    targets: [
      {
        amount: 1,
        collection: {
          id: 'collection-id'
        }
      }
    ]
  }
  it('throws if items are not valid', () => {
    expect(() => createListingSchema.parse(dissoc('items', validRequest))).toThrow()
    expect(() => createListingSchema.parse(assoc('items', [], validRequest))).toThrow()
    expect(() =>
      createListingSchema.parse(
        assoc(
          'items',
          {
            amount: 1,
            nft: {
              id: 'nft-id'
            }
          },
          validRequest
        )
      )
    ).toThrow()
  })
  it('throws if targets are not valid', () => {
    expect(() => createListingSchema.parse(dissoc('targets', validRequest))).toThrow()
    expect(() => createListingSchema.parse(assoc('targets', [], validRequest))).toThrow()
    expect(() =>
      createListingSchema.parse(
        assoc(
          'targets',
          {
            amount: 1,
            collection: {
              id: 'collection-id'
            }
          },
          validRequest
        )
      )
    ).toThrow()
  })
  it('valid', () => {
    expect(createListingSchema.parse(validRequest)).toStrictEqual(validRequest)
  })
})
