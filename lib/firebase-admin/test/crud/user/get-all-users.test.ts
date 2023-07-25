import { getAllUsers } from '../../../src/crud/user/get-all-users'
import { FirestoreUserData, userFirestoreData } from '@echo/firestore'
import { describe, expect, it } from '@jest/globals'
import { R } from '@mobily/ts-belt'
import { dissoc } from 'ramda'

describe('crud - user - getAllUsers', () => {
  it('retrieves all users from Firestore', async () => {
    const result = await getAllUsers()
    expect(R.isError(result)).toBeFalsy()
    const data = R.getExn(result)
    expect(data.length).toEqual(3)
    expect(dissoc<FirestoreUserData, 'updatedAt'>('updatedAt', data[0]!)).toEqual(
      dissoc<FirestoreUserData, 'updatedAt'>('updatedAt', userFirestoreData['6rECUMhevHfxABZ1VNOm']!)
    )
    expect(dissoc<FirestoreUserData, 'updatedAt'>('updatedAt', data[1]!)).toEqual(
      dissoc<FirestoreUserData, 'updatedAt'>('updatedAt', userFirestoreData['9tPlFOv1XkR3ng7KI46B']!)
    )
    expect(dissoc<FirestoreUserData, 'updatedAt'>('updatedAt', data[2]!)).toEqual(
      dissoc<FirestoreUserData, 'updatedAt'>('updatedAt', userFirestoreData['oE6yUEQBPn7PZ89yMjKn']!)
    )
  })
})
