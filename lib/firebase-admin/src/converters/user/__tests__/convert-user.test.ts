/* eslint-disable @typescript-eslint/ban-ts-comment */
import { emptySnapshot } from '../../../utils/test/mocks/empty-snapshot'
import { userData } from '../../../utils/test/mocks/user/user-data'
import { userSnapshots } from '../../../utils/test/mocks/user/user-snapshot'
import { convertUser } from '../convert-user'
import { describe, expect, it } from '@jest/globals'

describe('convertUser', () => {
  const mockSnapshot = userSnapshots['oE6yUEQBPn7PZ89yMjKn']!
  it('empty snapshot throws', async () => {
    try {
      await convertUser(emptySnapshot())
    } catch (e) {
      expect((e as Error).message).toMatch('Document does not exist')
    }
  })
  it('user with empty guild is converted properly', async () => {
    // @ts-ignore
    const user = await convertUser({ ...mockSnapshot, data: () => ({ ...mockSnapshot.data()!, discordGuilds: [] }) })
    expect(user).toEqual({ ...userData['oE6yUEQBPn7PZ89yMjKn']!, discordGuilds: [] })
  })
  it('user with empty wallet is converted properly', async () => {
    // @ts-ignore
    const user = await convertUser({ ...mockSnapshot, data: () => ({ ...mockSnapshot.data()!, wallets: [] }) })
    expect(user).toEqual({ ...userData['oE6yUEQBPn7PZ89yMjKn']!, wallets: [] })
  })
  it('user is converted properly', async () => {
    const user = await convertUser(mockSnapshot)
    expect(user).toEqual(userData['oE6yUEQBPn7PZ89yMjKn']!)
  })
})
