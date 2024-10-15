import type { UserDocumentData } from '@echo/firestore/types/model/user-document-data'
import { userDocumentDataMock } from '@echo/firestore/mocks/user/user-document-data-mock'
import { type NonEmptyArray } from 'ramda'

export function getAllUserDocumentDataMocks() {
  return Object.values(userDocumentDataMock()) as NonEmptyArray<UserDocumentData>
}
