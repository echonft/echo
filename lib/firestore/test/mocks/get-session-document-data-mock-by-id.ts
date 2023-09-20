import { sessionDocumentDataMock } from '@echo/firestore-mocks/session-document-data-mock'

export function getSessionDocumentDataMockById(id: string) {
  return sessionDocumentDataMock[id]!
}
