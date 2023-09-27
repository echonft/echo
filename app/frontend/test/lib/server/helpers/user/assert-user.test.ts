import type { FirestoreUser } from '@echo/firestore/types/model/user/firestore-user'
import { assertUser } from '@server/helpers/user/assert-user'

describe('helpers - user - assertUser', () => {
  it('throws if user is undefined', () => {
    expect(() => assertUser(undefined)).toThrow()
  })
  it('does not throw if user is defined', () => {
    expect(() => assertUser({ id: 'userId' } as FirestoreUser)).not.toThrow()
  })
})
