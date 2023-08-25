import { assertUser } from '../../../src/helpers/user/assert-user'
import { User } from '@echo/firestore'
import { describe, expect, it } from '@jest/globals'

describe('helpers - user - assertUser', () => {
  it('throws if user is undefined', () => {
    expect(() => assertUser(undefined)).toThrow()
  })
  it('does not throw if user is defined', () => {
    expect(() => assertUser({ id: 'userId' } as User)).not.toThrow()
  })
})
