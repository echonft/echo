import { type UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import { assertUserExists } from '@echo/frontend/lib/server/helpers/user/assert-user-exists'

describe('helpers - user - assertUserExists', () => {
  it('throws if user is undefined', () => {
    expect(() => assertUserExists(undefined, 'username')).toThrow()
  })
  it('does not throw if user is defined', () => {
    expect(() => assertUserExists({ id: 'userId' } as UserDocumentData, 'username')).not.toThrow()
  })
})
