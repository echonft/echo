import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import { getUserDocumentDataMockById } from '@echo/firestore-mocks/user/get-user-document-data-mock-by-id'
import type { Nullable } from '@echo/utils/types/nullable'
import { expect } from '@jest/globals'
import { omit } from 'ramda'

export function expectUserDocumentDataToEqualMock(user: Nullable<UserDocumentData>) {
  expect(user).toBeDefined()
  expect(omit(['createdAt', 'updatedAt'], getUserDocumentDataMockById(user!.id))).toStrictEqual(
    omit(['createdAt', 'updatedAt'], user)
  )
}
