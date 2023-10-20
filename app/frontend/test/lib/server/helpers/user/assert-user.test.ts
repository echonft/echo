import { type UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import { assertUser } from '@echo/frontend/lib/server/helpers/user/assert-user'

describe('helpers - user - assertUser', () => {
  it('throws if user is undefined', () => {
    expect(() => assertUser(undefined)).toThrow()
  })
  it('does not throw if user is defined', () => {
    expect(() => assertUser({ id: 'userId' } as UserDocumentData)).not.toThrow()
  })
})
