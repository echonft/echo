import { getFirestoreUserData } from '../../data/user/get-firestore-user-data'
import { userData } from '../../utils/test/mocks/user/user-data'
import { describe, expect, it } from '@jest/globals'

describe('convertUser', () => {
  it('user conversion', async () => {
    const user = await getFirestoreUserData('oE6yUEQBPn7PZ89yMjKn')
    expect(user).toEqual(userData['oE6yUEQBPn7PZ89yMjKn']!)
  })
})
