import { userDataConverter } from '@echo/firestore/converters/user/user-data-converter'
import { getUserDocumentDataMockByUsername } from '@echo/firestore/mocks/user/get-user-document-data-mock-by-username'
import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import { userMockJohnnyUsername } from '@echo/model/mocks/user/user-mock'
import type { Username } from '@echo/model/types/username'
import { describe, expect, it } from '@jest/globals'
import { QueryDocumentSnapshot, type WithFieldValue } from 'firebase-admin/firestore'
import { assoc, modify, toUpper } from 'ramda'

describe('converters - userDataConverter', () => {
  const document: UserDocumentData = getUserDocumentDataMockByUsername(userMockJohnnyUsername())
  const documentData: UserDocumentData = getUserDocumentDataMockByUsername(userMockJohnnyUsername())
  const snapshot = {
    id: 'userId',
    exists: true,
    data: () => documentData
  } as QueryDocumentSnapshot<UserDocumentData>

  it('from Firestore conversion', () => {
    expect(
      userDataConverter.fromFirestore(assoc('data', () => modify('username', toUpper, documentData), snapshot))
    ).toStrictEqual(document)
  })
  it('to Firestore conversion', () => {
    expect(
      userDataConverter.toFirestore(
        // @ts-expect-error Just to test uppercase -> lowercase conversion, even though typing does not allow it
        modify<WithFieldValue<UserDocumentData>, 'username', Username>('username', toUpper, document)
      )
    ).toStrictEqual(documentData)
  })
})
