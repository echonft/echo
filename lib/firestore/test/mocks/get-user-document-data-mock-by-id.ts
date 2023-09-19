import { userDocumentDataMock } from '@echo/firestore-mocks/user-document-data-mock'

export function getUserDocumentDataMockById(id: string) {
  return userDocumentDataMock[id]!
}
