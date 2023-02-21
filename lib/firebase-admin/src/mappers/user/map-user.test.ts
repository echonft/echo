import { getFirestoreUserData } from '../../data/user/get-firestore-user-data'
import { users } from '../../utils/test/mocks/user/user'
import { mapUser } from '@echo/firestore/dist/mappers/user'
import { describe, expect, it } from '@jest/globals'
import { pipe } from 'ramda'

describe('mapUser', () => {
  it('user mapping without wallets', async () => {
    const fetchedUser = await pipe(getFirestoreUserData, mapUser)('oE6yUEQBPn7PZ89yMjKn', {
      wallets: { getDocs: false }
    })
    expect(fetchedUser).toEqual(Object.assign({}, users['oE6yUEQBPn7PZ89yMjKn']!, { wallets: undefined }))
  })

  it('user mapping with wallets', async () => {
    const fetchedUser = await pipe(getFirestoreUserData, mapUser)('oE6yUEQBPn7PZ89yMjKn', {
      wallets: { getDocs: true }
    })
    expect(fetchedUser).toEqual(users['oE6yUEQBPn7PZ89yMjKn'])
  })
})
