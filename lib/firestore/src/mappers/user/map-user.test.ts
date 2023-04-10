import { convertUser } from '../../converters/user/convert-user'
import { FirestoreUser, FirestoreUserData } from '../../types'
import { getDocSnapshotFromPath } from '../../utils'
import { mapUser } from './map-user'
import { beforeEach, describe, expect, it } from '@jest/globals'

// export type FirestoreMapper<T extends FirestoreDocumentData, V> = (data: Promise<T>) => Promise<V>
describe('mapUser', () => {
  let userSnapshot: Promise<FirestoreUserData>
  beforeEach(() => {
    userSnapshot = getDocSnapshotFromPath<FirestoreUser>('users/oE6yUEQBPn7PZ89yMjKn').then((snapshot) =>
      convertUser(snapshot)
    )
  })
  it('', async () => {
    const mappedUser = await mapUser(userSnapshot)
    expect(mappedUser.id).toEqual('oE6yUEQBPn7PZ89yMjKn')
  })
})
