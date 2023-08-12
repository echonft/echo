import { mapUser } from '../../src/mappers/user/map-user'
import { userFirestoreData } from '../mocks/user-firestore-data'
import { users } from '../../../ui-model'
import { describe, expect, it } from '@jest/globals'

describe('mapUser', () => {
  it('user mapping', async () => {
    const user = await mapUser(Promise.resolve(userFirestoreData['oE6yUEQBPn7PZ89yMjKn']!))
    expect(user).toEqual(users['oE6yUEQBPn7PZ89yMjKn'])
  })
})
