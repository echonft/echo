import { createListingRequestMock } from '@echo/api/mocks/create-listing-request-mock'
import { createListingRequestSchema } from '@echo/api/validators/create-listing-request-schema'
import { describe, expect, it } from '@jest/globals'
import { assoc, dissoc, head, pipe, prop } from 'ramda'
import { ZodIssueCode } from 'zod'

describe('validators - createListingRequestSchema', () => {
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
    expectZodError(assoc('expiration', undefined, createListingRequestMock), ZodIssueCode.invalid_type)
    expectZodError(assoc('expiration', '1h', createListingRequestMock), ZodIssueCode.invalid_enum_value)
  })

  it('throws if items are not valid', () => {
    expectZodError(dissoc('items', createListingRequestMock), ZodIssueCode.invalid_type)
    expectZodError(assoc('items', [], createListingRequestMock), ZodIssueCode.too_small)
    expectZodError(assoc('items', undefined, createListingRequestMock), ZodIssueCode.invalid_type)
    expectZodError(assoc('items', null, createListingRequestMock), ZodIssueCode.invalid_type)
  })

  it('throws if targets are not valid', () => {
    expectZodError(dissoc('target', createListingRequestMock), ZodIssueCode.invalid_type)
    expectZodError(assoc('target', undefined, createListingRequestMock), ZodIssueCode.invalid_type)
    expectZodError(
      assoc(
        'target',
        {
          quantity: 1,
          collection: {}
        },
        createListingRequestMock
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
        createListingRequestMock
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
        createListingRequestMock
      ),
      ZodIssueCode.too_small
    )
  })

  it('valid', () => {
    expect(createListingRequestSchema.parse(createListingRequestMock)).toStrictEqual(createListingRequestMock)
  })
})
