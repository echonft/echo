import { usernameSchema } from '@echo/model/validators/username-schema'
import { describe, expect, it } from '@jest/globals'
import { toLower } from 'ramda'

describe('usernameSchema', () => {
  it('invalid', () => {
    expect(() => usernameSchema.parse(undefined)).toThrow()
    expect(() => usernameSchema.parse(null)).toThrow()
    expect(() => usernameSchema.parse('')).toThrow()
    expect(() => usernameSchema.parse(1)).toThrow()
    expect(() => usernameSchema.parse({})).toThrow()
  })

  it('valid', () => {
    const values = ['username', 'USERname', 'user-name']
    for (const value of values) {
      expect(usernameSchema.parse(value)).toStrictEqual(toLower(value))
    }
  })
})
