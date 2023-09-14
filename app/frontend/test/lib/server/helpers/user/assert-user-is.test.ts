import { FirestoreUser } from '@echo/firestore/types/model/firestore-user'
import { assertUser } from '@server/helpers/user/assert-user'
import { assertUserIs } from '@server/helpers/user/assert-user-is'

describe('helpers - user - assertUserIs', () => {
  it('throws if the user id is not the same as the passed parameter', () => {
    expect(() => assertUserIs('not-same-id', { id: 'userId' } as FirestoreUser)).toThrow()
  })
  it('does not throw if the user id is the same as the passed parameter', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(() => assertUser('userId', { id: 'userId' } as FirestoreUser)).not.toThrow()
  })
})
