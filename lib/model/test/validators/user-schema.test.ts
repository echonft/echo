import type { Username } from '@echo/model/types/username'
import { userSchema } from '@echo/model/validators/user-schema'
import { usernameSchema } from '@echo/model/validators/username-schema'
import { describe, expect, it } from '@jest/globals'
import { assocPath, toLower } from 'ramda'
import { ZodError, ZodIssueCode } from 'zod'

describe('userSchema', () => {
  const validUser: User = {
    username: 'johnnycagewins',
    discord: {
      username: 'johnnycagewins',
      avatarUrl: 'https://example.com/image.png',
      globalName: 'globalName'
    }
  }

  it('invalid', () => {
    expect(() => userSchema.parse(undefined)).toThrow(
      ZodError.create([
        {
          code: ZodIssueCode.invalid_type,
          expected: 'object',
          received: 'undefined',
          path: [],
          message: 'Required'
        }
      ])
    )
    expect(() => userSchema.parse(undefined)).toThrow(
      ZodError.create([
        {
          code: ZodIssueCode.invalid_type,
          expected: 'object',
          received: 'undefined',
          path: [],
          message: 'Required'
        }
      ])
    )
    expect(() => userSchema.parse('')).toThrow(
      ZodError.create([
        {
          code: ZodIssueCode.invalid_type,
          expected: 'object',
          received: 'string',
          path: [],
          message: 'Expected object, received string'
        }
      ])
    )
    expect(() => userSchema.parse(1)).toThrow(
      ZodError.create([
        {
          code: ZodIssueCode.invalid_type,
          expected: 'object',
          received: 'number',
          path: [],
          message: 'Expected object, received number'
        }
      ])
    )
    expect(() => userSchema.parse({})).toThrow(
      ZodError.create([
        {
          code: ZodIssueCode.invalid_type,
          expected: 'object',
          received: 'undefined',
          path: ['discord'],
          message: 'Required'
        },
        {
          code: ZodIssueCode.invalid_type,
          expected: 'string',
          received: 'undefined',
          path: ['username'],
          message: 'Required'
        }
      ])
    )
  })

  it('invalid with discord avatar url is not valid', () => {
    expect(() => userSchema.parse(assocPath(['discord', 'avatarUrl'], undefined, validUser))).toThrow(
      ZodError.create([
        {
          code: ZodIssueCode.invalid_type,
          expected: 'string',
          received: 'undefined',
          path: ['discord', 'avatarUrl'],
          message: 'Required'
        }
      ])
    )
    expect(() => userSchema.parse(assocPath(['discord', 'avatarUrl'], null, validUser))).toThrow(
      ZodError.create([
        {
          code: ZodIssueCode.invalid_type,
          expected: 'string',
          received: 'null',
          path: ['discord', 'avatarUrl'],
          message: 'Expected string, received null'
        }
      ])
    )
    expect(() => userSchema.parse(assocPath(['discord', 'avatarUrl'], '', validUser))).toThrow(
      ZodError.create([
        {
          validation: 'url',
          code: ZodIssueCode.invalid_string,
          message: 'Invalid url',
          path: ['discord', 'avatarUrl']
        }
      ])
    )
    expect(() => userSchema.parse(assocPath(['discord', 'avatarUrl'], 1, validUser))).toThrow(
      ZodError.create([
        {
          code: ZodIssueCode.invalid_type,
          expected: 'string',
          received: 'number',
          path: ['discord', 'avatarUrl'],
          message: 'Expected string, received number'
        }
      ])
    )
    expect(() => userSchema.parse(assocPath(['discord', 'avatarUrl'], {}, validUser))).toThrow(
      ZodError.create([
        {
          code: ZodIssueCode.invalid_type,
          expected: 'string',
          received: 'object',
          path: ['discord', 'avatarUrl'],
          message: 'Expected string, received object'
        }
      ])
    )
    expect(() => userSchema.parse(assocPath(['discord', 'avatarUrl'], 'not-a-url', validUser))).toThrow(
      ZodError.create([
        {
          validation: 'url',
          code: ZodIssueCode.invalid_string,
          message: 'Invalid url',
          path: ['discord', 'avatarUrl']
        }
      ])
    )
    expect(() => userSchema.parse(assocPath(['discord', 'avatarUrl'], 'not-a-url.com/path', validUser))).toThrow(
      ZodError.create([
        {
          validation: 'url',
          code: ZodIssueCode.invalid_string,
          message: 'Invalid url',
          path: ['discord', 'avatarUrl']
        }
      ])
    )
    expect(() => userSchema.parse(assocPath(['discord', 'avatarUrl'], '/path/a/b/c', validUser))).toThrow(
      ZodError.create([
        {
          validation: 'url',
          code: ZodIssueCode.invalid_string,
          message: 'Invalid url',
          path: ['discord', 'avatarUrl']
        }
      ])
    )
    expect(() => userSchema.parse(assocPath(['discord', 'avatarUrl'], 'path/a/b/c', validUser))).toThrow(
      ZodError.create([
        {
          validation: 'url',
          code: ZodIssueCode.invalid_string,
          message: 'Invalid url',
          path: ['discord', 'avatarUrl']
        }
      ])
    )
  })

  it('invalid with discord username is not valid', () => {
    expect(() => userSchema.parse(assocPath(['discord', 'username'], undefined, validUser))).toThrow(
      ZodError.create([
        {
          code: ZodIssueCode.invalid_type,
          expected: 'string',
          received: 'undefined',
          path: ['discord', 'username'],
          message: 'Required'
        }
      ])
    )
    expect(() => userSchema.parse(assocPath(['discord', 'username'], null, validUser))).toThrow(
      ZodError.create([
        {
          code: ZodIssueCode.invalid_type,
          expected: 'string',
          received: 'null',
          path: ['discord', 'username'],
          message: 'Expected string, received null'
        }
      ])
    )
    expect(() => userSchema.parse(assocPath(['discord', 'username'], '', validUser))).toThrow(
      ZodError.create([
        {
          code: ZodIssueCode.too_small,
          minimum: 1,
          type: 'string',
          inclusive: true,
          exact: false,
          message: 'String must contain at least 1 character(s)',
          path: ['discord', 'username']
        }
      ])
    )
    expect(() => userSchema.parse(assocPath(['discord', 'username'], 1, validUser))).toThrow(
      ZodError.create([
        {
          code: ZodIssueCode.invalid_type,
          expected: 'string',
          received: 'number',
          path: ['discord', 'username'],
          message: 'Expected string, received number'
        }
      ])
    )
    expect(() => userSchema.parse(assocPath(['discord', 'username'], {}, validUser))).toThrow(
      ZodError.create([
        {
          code: ZodIssueCode.invalid_type,
          expected: 'string',
          received: 'object',
          path: ['discord', 'username'],
          message: 'Expected string, received object'
        }
      ])
    )
  })

  it('invalid with discord global name is not valid', () => {
    expect(() => userSchema.parse(assocPath(['discord', 'globalName'], 1, validUser))).toThrow(
      ZodError.create([
        {
          code: ZodIssueCode.invalid_type,
          expected: 'string',
          received: 'number',
          path: ['discord', 'globalName'],
          message: 'Expected string, received number'
        }
      ])
    )
    expect(() => userSchema.parse(assocPath(['discord', 'globalName'], {}, validUser))).toThrow(
      ZodError.create([
        {
          code: ZodIssueCode.invalid_type,
          expected: 'string',
          received: 'object',
          path: ['discord', 'globalName'],
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
  describe('valid', () => {
    it('valid without globalName', () => {
      const validUser: User = {
        username: 'johnnycagewins',
        discord: {
          username: 'johnnycagewins',
          avatarUrl: 'https://example.com/image.png'
        }
      }
      expect(userSchema.parse(validUser)).toStrictEqual(validUser)
    })
  })

  it('valid with nil globalName', () => {
    const validUser: User = {
      username: 'johnnycagewins',
      discord: {
        username: 'johnnycagewins',
        avatarUrl: 'https://example.com/image.png'
      }
    }
    expect(userSchema.parse(assocPath(['discord', 'globalName'], undefined, validUser))).toStrictEqual(validUser)
    expect(userSchema.parse(assocPath(['discord', 'globalName'], null, validUser))).toStrictEqual(validUser)
  })

  it('valid with empty globalName', () => {
    const validUser: User = {
      username: 'johnnycagewins',
      discord: {
        username: 'johnnycagewins',
        avatarUrl: 'https://example.com/image.png'
      }
    }
    expect(userSchema.parse(assocPath(['discord', 'globalName'], '', validUser))).toStrictEqual(validUser)
  })
})

interface User {
  discord: {
    avatarUrl: string
    username: Username
    globalName?: string
  }
  username: Username
}
