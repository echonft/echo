import { FirestoreSnapshot } from '../../../types/abstract/firestore-snapshot'
import { emptySnapshot } from '../../../utils/test/mocks/empty-snapshot'
import { userData } from '../../../utils/test/mocks/user/user-data'
import { userSnapshots } from '../../../utils/test/mocks/user/user-snapshot'
import { convertUser } from '../convert-user'
import { FirestoreUser } from '@echo/firestore'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

describe('convertUser', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const mockSnapshot = userSnapshots['oE6yUEQBPn7PZ89yMjKn']!
  it('empty snapshot throws', async () => {
    try {
      await convertUser(emptySnapshot())
    } catch (e) {
      expect((e as Error).message).toMatch('Document does not exist')
    }
  })
  it('user with empty guild is converted properly', async () => {
    const user = await convertUser({
      ...mockSnapshot,
      data: () => ({ ...mockSnapshot.data()!, discordGuilds: [] })
    } as unknown as FirestoreSnapshot<FirestoreUser>)
    expect(user).toEqual({ ...userData['oE6yUEQBPn7PZ89yMjKn']!, discordGuilds: [] })
  })
  it('user with empty wallet is converted properly', async () => {
    const user = await convertUser({
      ...mockSnapshot,
      data: () => ({ ...mockSnapshot.data()!, wallets: [] })
    } as unknown as FirestoreSnapshot<FirestoreUser>)
    expect(user).toEqual({ ...userData['oE6yUEQBPn7PZ89yMjKn']!, wallets: [] })
  })
  it('user is converted properly', async () => {
    const user = await convertUser(mockSnapshot)
    expect(user).toEqual(userData['oE6yUEQBPn7PZ89yMjKn']!)
  })
})
