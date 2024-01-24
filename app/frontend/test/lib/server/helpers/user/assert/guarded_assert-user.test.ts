import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import { guarded_assertUserExists } from '@echo/frontend/lib/helpers/user/assert/guarded_assert-user-exists'

describe('helpers - user - assert - guarded_assertUserExists', () => {
  it('throws if user is undefined', () => {
    expect(() => guarded_assertUserExists(undefined, 'username')).toThrow()
  })
  it('does not throw if user is defined', () => {
    expect(() => guarded_assertUserExists({ id: 'userId' } as UserDocumentData, 'username')).not.toThrow()
  })
})
