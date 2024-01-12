import { getUsersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-users-collection-reference'
import { userMock } from '@echo/firestore-mocks/user/user-mock'

export async function initializeUsers() {
  const users = Object.values(userMock)
  for (const user of users) {
    getUsersCollectionReference()
    await getUsersCollectionReference().doc(user.id).set(user)
  }
}
