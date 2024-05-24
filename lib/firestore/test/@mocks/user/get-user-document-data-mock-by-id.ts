import { userDocumentDataMock } from '@echo/firestore-mocks/user/user-document-data-mock'
import { isNil } from 'ramda'

export function getUserDocumentDataMockById(id: string) {
  const mock = userDocumentDataMock[id]
  if (isNil(mock)) {
    throw Error(`wrong UserDocumentData mock id: ${id}`)
  }
  return mock
}
