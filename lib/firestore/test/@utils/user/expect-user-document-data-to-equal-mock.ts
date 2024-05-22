import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import { getUserDocumentDataMockByUsername } from '@echo/firestore-mocks/user/get-user-document-data-mock-by-username'
import type { Nullable } from '@echo/utils/types/nullable'
import { expect } from '@jest/globals'
import { omit } from 'ramda'

export function expectUserDocumentDataToEqualMock(user: Nullable<UserDocumentData>) {
  expect(user).toBeDefined()
  expect(omit(['createdAt', 'updatedAt'], getUserDocumentDataMockByUsername(user!.username))).toStrictEqual(
    omit<UserDocumentData, 'createdAt' | 'updatedAt'>(['createdAt', 'updatedAt'], user!)
  )
}
