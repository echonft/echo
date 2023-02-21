import { getFirestoreUserData } from '../../data/user/get-firestore-user-data'
import { userData } from '../../utils/test/mocks/user/user-data'
import { describe, expect, it } from '@jest/globals'

describe('convertUser', () => {
  it('user conversion without wallets', async () => {
    const user = await getFirestoreUserData('oE6yUEQBPn7PZ89yMjKn', {
      wallets: {
        getDocs: false
      }
    })
    expect(user).toEqual(
      Object.assign({}, userData['oE6yUEQBPn7PZ89yMjKn']!, {
        wallets: {
          path: 'users/oE6yUEQBPn7PZ89yMjKn/wallets',
          data: undefined
        }
      })
    )
  })

  it('user conversion with wallets', async () => {
    const user = await getFirestoreUserData('oE6yUEQBPn7PZ89yMjKn', {
      wallets: {
        getDocs: true
      }
    })
    expect(user).toEqual(userData['oE6yUEQBPn7PZ89yMjKn']!)
  })

  // TODO test constraints
})
