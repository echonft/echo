import { getAllUsers } from '../../../src/crud/user/get-all-users'
import { FirestoreUserData, userFirestoreData } from '@echo/firestore'
import { describe, expect, it } from '@jest/globals'
import { dissoc } from 'ramda'

describe('crud - user - getAllUsers', () => {
  it('retrieves all users from Firestore', async () => {
    const users = await getAllUsers()
    expect(users.length).toEqual(4)
    expect(dissoc<FirestoreUserData, 'updatedAt'>('updatedAt', users[0]!)).toEqual(
      dissoc<FirestoreUserData, 'updatedAt'>('updatedAt', userFirestoreData['6rECUMhevHfxABZ1VNOm']!)
    )
    expect(dissoc<FirestoreUserData, 'updatedAt'>('updatedAt', users[1]!)).toEqual(
      dissoc<FirestoreUserData, 'updatedAt'>('updatedAt', userFirestoreData['9tPlFOv1XkR3ng7KI46B']!)
    )
    expect(dissoc<FirestoreUserData, 'updatedAt'>('updatedAt', users[2]!)).toEqual(
      dissoc<FirestoreUserData, 'updatedAt'>('updatedAt', userFirestoreData['oE6yUEQBPn7PZ89yMjKn']!)
    )
    expect(dissoc<FirestoreUserData, 'updatedAt'>('updatedAt', users[3]!)).toEqual(
      dissoc<FirestoreUserData, 'updatedAt'>('updatedAt', userFirestoreData['xUcl0enoVsuvpsAf9syg']!)
    )
  })
})
