import { getFirestoreUserData } from '../../data/user/get-firestore-user-data'
import { users } from '../../utils/test/mocks/user/user'
import { mapUser } from '@echo/firestore'
import { describe, expect, it } from '@jest/globals'
import { pipe } from 'ramda'

describe('mapUser', () => {
  it('user mapping', async () => {
    const user = await pipe(getFirestoreUserData, mapUser)('oE6yUEQBPn7PZ89yMjKn')
    expect(user).toEqual(users['oE6yUEQBPn7PZ89yMjKn'])
  })
})
