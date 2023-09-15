import { sessionDocumentDataMock } from '@echo/firestore-mocks/session-document-data-mock'

export const getSessionDocumentDataMockByUserId = (userId: string) => sessionDocumentDataMock[userId]!
