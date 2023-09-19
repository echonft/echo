import { sessionDocumentDataMock } from '@echo/firestore-mocks/session-document-data-mock'

export function getSessionDocumentDataMockByUserId(userId: string) {
  return sessionDocumentDataMock[userId]!
}
