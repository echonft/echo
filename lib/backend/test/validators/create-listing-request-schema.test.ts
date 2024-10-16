import { type CreateListingRequest } from '@echo/api/types/requests/create-listing-request'
import { createListingRequestSchema } from '@echo/backend/validators/create-listing-request-schema'
import { Expiration } from '@echo/model/constants/expiration'
import { TokenType } from '@echo/model/constants/token-type'
import { describe, expect, it } from '@jest/globals'
import { assoc, dissoc } from 'ramda'

describe('validators - createListingRequestSchema', () => {
  const validRequest: CreateListingRequest = {
    items: [
      {
        token: {
          collection: {
            slug: 'collection-slug'
          },
          tokenId: 1,
          type: TokenType.Erc721
        }
      }
    ],
    target: {
      quantity: 1,
      collection: {
        slug: 'collection-slug'
      }
    },
    expiration: Expiration.OneDay
  }
  it('throws if expires at is not valid', () => {
    expect(() => createListingRequestSchema.parse(assoc('expiration', undefined))).toThrow()
    expect(() => createListingRequestSchema.parse(assoc('expiration', '1h'))).toThrow()
  })
  it('throws if items are not valid', () => {
    expect(() => createListingRequestSchema.parse(dissoc('items', validRequest))).toThrow()
    expect(() => createListingRequestSchema.parse(assoc('items', [], validRequest))).toThrow()
    expect(() =>
      createListingRequestSchema.parse(
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
    expect(() => createListingRequestSchema.parse(dissoc('target', validRequest))).toThrow()
    expect(() => createListingRequestSchema.parse(assoc('target', undefined, validRequest))).toThrow()
    expect(() =>
      createListingRequestSchema.parse(
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
      createListingRequestSchema.parse(
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
      createListingRequestSchema.parse(
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
      createListingRequestSchema.parse(
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
    expect(createListingRequestSchema.parse(validRequest)).toStrictEqual(validRequest)
  })
})
