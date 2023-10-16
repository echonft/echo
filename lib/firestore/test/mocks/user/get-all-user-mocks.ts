import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import { userMock } from '@echo/firestore-mocks/user/user-mock'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'

export function getAllUserMocks() {
  return Object.values(userMock) as NonEmptyArray<UserDocumentData>
}
