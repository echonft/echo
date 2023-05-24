import { getFirestoreUserData } from '../../src/data/user/get-firestore-user-data'
import { mapUser } from '@echo/firestore'
import { users } from '@echo/model'
import { describe, expect, it } from '@jest/globals'
import { pipe } from 'ramda'

describe('mapUser', () => {
  it('user mapping', async () => {
    const user = await pipe(getFirestoreUserData, mapUser)('oE6yUEQBPn7PZ89yMjKn')
    expect(user).toEqual(users['oE6yUEQBPn7PZ89yMjKn'])
  })
})
