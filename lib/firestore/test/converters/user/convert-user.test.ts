/* eslint-disable @typescript-eslint/ban-ts-comment */
import { CollectionName } from '../../../src/config/collection-name'
import { convertUser } from '../../../src/converters/user/convert-user'
import { FirestoreSnapshot } from '../../../src/types/abstract/firestore-snapshot'
import { FirestoreUser } from '../../../src/types/model/collections/user/firestore-user'
import { getDocSnapshot } from '../../../src/utils/document/get-doc-snapshot'
import { userFirestoreData } from '../../mocks/user/user-firestore-data'
import { userSnapshots } from '../../mocks/user/user-snapshot'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

describe('convertUser', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const mockSnapshot = userSnapshots['oE6yUEQBPn7PZ89yMjKn']!
  it('empty snapshot throws', async () => {
    try {
      await convertUser({
        ref: {
          path: ''
        },
        id: '',
        exists: false,
        data: () => undefined
      } as FirestoreSnapshot<FirestoreUser>)
    } catch (error) {
      expect(error).toBeDefined()
    }
  })
  it('user with empty guild is converted properly', async () => {
    const user = await convertUser({
      ...mockSnapshot,
      data: () => ({ ...mockSnapshot.data()!, discordGuilds: [] })
    } as unknown as FirestoreSnapshot<FirestoreUser>)
    expect(user).toEqual({ ...userFirestoreData['oE6yUEQBPn7PZ89yMjKn']!, discordGuilds: [] })
  })
  it('user with empty wallet is converted properly', async () => {
    const userSnapshot = await getDocSnapshot(CollectionName.USERS, '9tPlFOv1XkR3ng7KI46B')
    // @ts-ignore
    const user = await convertUser(userSnapshot)
    expect(user).toEqual(userFirestoreData['9tPlFOv1XkR3ng7KI46B']!)
  })
  it('user is converted properly', async () => {
    const userSnapshot = await getDocSnapshot(CollectionName.USERS, 'oE6yUEQBPn7PZ89yMjKn')
    // @ts-ignore
    const user = await convertUser(userSnapshot)
    expect(user).toEqual(userFirestoreData['oE6yUEQBPn7PZ89yMjKn']!)
  })
})
