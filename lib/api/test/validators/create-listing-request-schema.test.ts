import { createListingRequestSchema } from '@echo/api/validators/create-listing-request-schema'
import { Expiration } from '@echo/model/constants/expiration'
import { TokenType } from '@echo/model/constants/token-type'
import { describe, expect, it } from '@jest/globals'
import { assoc, dissoc, head, pipe, prop } from 'ramda'
import { ZodIssueCode } from 'zod'

describe('validators - createListingRequestSchema', () => {
  const validRequest = {
    items: [
      {
        token: {
          collection: {
            slug: 'collection-721-slug'
          },
          tokenId: 111,
          type: TokenType.Erc721
        }
      },
      {
        token: {
          collection: {
            slug: 'collection-1155-slug'
          },
          tokenId: 2,
          type: TokenType.Erc1155
        },
        quantity: 5
      }
    ],
    target: {
      collection: {
        slug: 'target-slug'
      },
      quantity: 2
    },
    expiration: Expiration.OneDay
  }

  function expectZodError(data: unknown, code: ZodIssueCode) {
    try {
      createListingRequestSchema.parse(data)
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      expect(() => {}).toThrow()
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(pipe(prop('issues'), head, prop('code'))(err)).toBe(code)
    }
  }

  it('throws if expires at is not valid', () => {
    expectZodError(assoc('expiration', undefined, validRequest), ZodIssueCode.invalid_type)
    expectZodError(assoc('expiration', '1h', validRequest), ZodIssueCode.invalid_enum_value)
  })

  it('throws if items are not valid', () => {
    expectZodError(dissoc('items', validRequest), ZodIssueCode.invalid_type)
    expectZodError(assoc('items', [], validRequest), ZodIssueCode.too_small)
    expectZodError(assoc('items', undefined, validRequest), ZodIssueCode.invalid_type)
    expectZodError(assoc('items', null, validRequest), ZodIssueCode.invalid_type)
  })

  it('throws if targets are not valid', () => {
    expectZodError(dissoc('target', validRequest), ZodIssueCode.invalid_type)
    expectZodError(assoc('target', undefined, validRequest), ZodIssueCode.invalid_type)
    expectZodError(
      assoc(
        'target',
        {
          quantity: 1,
          collection: {}
        },
        validRequest
      ),
      ZodIssueCode.invalid_type
    )
    expectZodError(
      assoc(
        'target',
        {
          collection: {
            slug: 'collection-slug'
          }
        },
        validRequest
      ),
      ZodIssueCode.invalid_type
    )
    expectZodError(
      assoc(
        'target',
        {
          quantity: 0,
          collection: {
            slug: 'collection-slug'
          }
        },
        validRequest
      ),
      ZodIssueCode.too_small
    )
  })

  it('valid', () => {
    expect(createListingRequestSchema.parse(validRequest)).toStrictEqual(validRequest)
  })
})
