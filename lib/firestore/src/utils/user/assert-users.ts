import { getAllUserDocumentDataMocks } from '@echo/firestore/mocks/user/get-all-user-document-data-mocks'
import { getAllUsers } from '@echo/firestore/crud/user/get-all-users'
import { eqListContent } from '@echo/utils/fp/eq-list-content'
import { expect } from '@jest/globals'

export async function assertUsers() {
  const documents = await getAllUsers()
  expect(eqListContent(documents, getAllUserDocumentDataMocks())).toBeTruthy()
}
