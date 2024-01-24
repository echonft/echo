import { getUsersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-users-collection-reference'
import { userDocumentDataMock } from '@echo/firestore-mocks/user/user-document-data-mock'

export async function initializeUsers() {
  const users = Object.values(userDocumentDataMock)
  for (const user of users) {
    getUsersCollectionReference()
    await getUsersCollectionReference().doc(user.id).set(user)
  }
}
