import { CollectionName } from '@echo/firestore/constants/collection-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { userDocumentDataMock } from '@echo/firestore-mocks/user/user-document-data-mock'

export async function initializeUsers() {
  const users = Object.values(userDocumentDataMock)
  for (const user of users) {
    await firestoreApp().collection(CollectionName.USERS).doc(user.id).set(user)
  }
}
