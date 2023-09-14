import { userDocumentDataMock } from '@echo/firestore-mocks/user-document-data-mock'

export const getUserDocumentDataMockById = (id: string) => userDocumentDataMock[id]!
