import type { User } from '@echo/firestore/types/model/user/user'
import { guarded_assertUserExists } from '@echo/frontend/lib/server/helpers/user/assert/guarded_assert-user-exists'

describe('helpers - user - assert - guarded_assertUserExists', () => {
  it('throws if user is undefined', () => {
    expect(() => guarded_assertUserExists(undefined, 'username')).toThrow()
  })
  it('does not throw if user is defined', () => {
    expect(() => guarded_assertUserExists({ id: 'userId' } as User, 'username')).not.toThrow()
  })
})
