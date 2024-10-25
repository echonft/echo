import { getAllUserDocumentDataMocks } from '@echo/firestore/mocks/db-model/user/get-all-user-document-data-mocks'
import type { Username } from '@echo/model/types/username'
import { find, isNil, propEq } from 'ramda'

export function getUserDocumentDataMockByUsername(username: Username) {
  const mock = find(propEq(username, 'username'), getAllUserDocumentDataMocks())
  if (isNil(mock)) {
    throw Error(`wrong UserDocumentDataMock mock username: ${username}`)
  }
  return mock
}
