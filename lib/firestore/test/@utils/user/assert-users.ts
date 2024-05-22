import { getAllUserDocumentDataMocks } from '@echo/firestore-mocks/user/get-all-user-document-data-mocks'
import { getAllUsers } from '@echo/firestore-test/user/get-all-users'
import { contentEq } from '@echo/utils/fp/content-eq'
import { expect } from '@jest/globals'

export async function assertUsers() {
  const documents = await getAllUsers()
  expect(contentEq(documents, getAllUserDocumentDataMocks())).toBeTruthy()
}
