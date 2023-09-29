import { CollectionName } from '@echo/firestore/constants/collection-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { userMock } from '@echo/firestore-mocks/user/user-mock'

export async function initializeUsers() {
  const users = Object.values(userMock)
  for (const user of users) {
    await firestoreApp().collection(CollectionName.USERS).doc(user.id).set(user)
  }
}
