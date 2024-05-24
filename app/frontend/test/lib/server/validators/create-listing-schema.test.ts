import { type CreateListingRequest } from '@echo/api/types/requests/create-listing-request'
import { createListingSchema } from '@echo/frontend/lib/validators/create-listing-schema'
import { assoc, dissoc } from 'ramda'

describe('validators - createListingSchema', () => {
  const validRequest: CreateListingRequest = {
    items: [
      {
        collection: {
          slug: 'collection-slug'
        },
        tokenId: 1
      }
    ],
    target: {
      amount: 1,
      collection: {
        slug: 'collection-slug'
      }
    }
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
    expect(() => createListingSchema.parse(dissoc('target', validRequest))).toThrow()
    expect(() => createListingSchema.parse(assoc('target', undefined, validRequest))).toThrow()
    expect(() =>
      createListingSchema.parse(
        assoc(
          'target',
          {
            amount: 1,
            collection: {}
          },
          validRequest
        )
      )
    ).toThrow()
    expect(() =>
      createListingSchema.parse(
        assoc(
          'target',
          {
            amount: 1
          },
          validRequest
        )
      )
    ).toThrow()
    expect(() =>
      createListingSchema.parse(
        assoc(
          'target',
          {
            collection: {
              slug: 'collection-slug'
            }
          },
          validRequest
        )
      )
    ).toThrow()
    expect(() =>
      createListingSchema.parse(
        assoc(
          'target',
          {
            amount: 0,
            collection: {
              slug: 'collection-slug'
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
