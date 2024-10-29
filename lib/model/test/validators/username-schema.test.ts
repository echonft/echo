import { usernameSchema } from '@echo/model/validators/username-schema'
import { describe, expect, it } from '@jest/globals'
import { toLower } from 'ramda'
import { ZodError, ZodIssueCode } from 'zod'

describe('usernameSchema', () => {
  it('invalid', () => {
    expect(() => usernameSchema.parse(undefined)).toThrow(
      ZodError.create([
        {
          code: ZodIssueCode.invalid_type,
          expected: 'string',
          received: 'undefined',
          path: [],
          message: 'Required'
        }
      ])
    )
    expect(() => usernameSchema.parse(null)).toThrow(
      ZodError.create([
        {
          code: ZodIssueCode.invalid_type,
          expected: 'string',
          received: 'null',
          path: [],
          message: 'Expected string, received null'
        }
      ])
    )
    expect(() => usernameSchema.parse('')).toThrow(
      ZodError.create([
        {
          code: ZodIssueCode.too_small,
          minimum: 1,
          type: 'string',
          inclusive: true,
          exact: false,
          message: 'String must contain at least 1 character(s)',
          path: []
        }
      ])
    )
    expect(() => usernameSchema.parse(1)).toThrow(
      ZodError.create([
        {
          code: ZodIssueCode.invalid_type,
          expected: 'string',
          received: 'number',
          path: [],
          message: 'Expected string, received number'
        }
      ])
    )
    expect(() => usernameSchema.parse({})).toThrow(
      ZodError.create([
        {
          code: ZodIssueCode.invalid_type,
          expected: 'string',
          received: 'object',
          path: [],
          message: 'Expected string, received object'
        }
      ])
    )
  })
  it('valid', () => {
    const values = ['username', 'USERname', 'user-name']
    for (const value of values) {
      expect(usernameSchema.parse(value)).toStrictEqual(toLower(value))
    }
  })
})
