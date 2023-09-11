import { User } from '@echo/firestore-types'
import { assertUser } from '@server/helpers/user/assert-user'

describe('helpers - user - assertUser', () => {
  it('throws if user is undefined', () => {
    expect(() => assertUser(undefined)).toThrow()
  })
  it('does not throw if user is defined', () => {
    expect(() => assertUser({ id: 'userId' } as User)).not.toThrow()
  })
})
