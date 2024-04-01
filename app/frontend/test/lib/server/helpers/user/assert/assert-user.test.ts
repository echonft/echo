import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import { assertUserExists } from '@echo/frontend/lib/helpers/user/assert/assert-user-exists'

describe('helpers - user - assert - assertUserExists', () => {
  it('throws if user is undefined', () => {
    expect(() => assertUserExists(undefined, 'username')).toThrow()
  })
  it('does not throw if user is defined', () => {
    expect(() => assertUserExists({ id: 'userId' } as UserDocumentData, 'username')).not.toThrow()
  })
})
