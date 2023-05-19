import { userFirestoreData } from '../../../mocks/src/user/user-firestore-data'
import { convertUser } from '../../src/converters/user/convert-user'
import { FirestoreSnapshot } from '../../src/types/abstract/firestore-snapshot'
import { userSnapshots } from '../mocks/user/user-snapshot'
import { FirestoreUser } from '@echo/firestore'
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
    } catch (e) {
      expect((e as Error).message).toMatch('Document does not exist')
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
    const user = await convertUser({
      ...mockSnapshot,
      data: () => ({ ...mockSnapshot.data()!, wallets: [] })
    } as unknown as FirestoreSnapshot<FirestoreUser>)
    expect(user).toEqual({ ...userFirestoreData['oE6yUEQBPn7PZ89yMjKn']!, wallets: [] })
  })
  it('user is converted properly', async () => {
    const user = await convertUser(mockSnapshot)
    expect(user).toEqual(userFirestoreData['oE6yUEQBPn7PZ89yMjKn']!)
  })
})
