import { userDocumentDataMock } from '@echo/firestore-mocks/user/user-document-data-mock'

export function getUserDocumentDataMockById(id: string) {
  return userDocumentDataMock[id]!
}
