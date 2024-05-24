import { getAllUserDocumentDataMocks } from '@echo/firestore-mocks/user/get-all-user-document-data-mocks'
import { find, isNil, propEq } from 'ramda'

export function getUserDocumentDataMockByUsername(username: string) {
  const mock = find(propEq(username, 'username'), getAllUserDocumentDataMocks())
  if (isNil(mock)) {
    throw Error(`wrong UserDocumentDataMock mock username: ${username}`)
  }
  return mock
}
