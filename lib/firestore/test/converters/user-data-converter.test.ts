import { userDataConverter } from '@echo/firestore/converters/user-data-converter'
import type { UserDocumentData } from '@echo/firestore/types/model/user-document-data'
import { userMockJohnny } from '@echo/model/mocks/user-mock'
import type { User } from '@echo/model/types/user'
import { describe, expect, it } from '@jest/globals'
import { QueryDocumentSnapshot, type WithFieldValue } from 'firebase-admin/firestore'

describe('converters - userDataConverter', () => {
  const document: User = userMockJohnny
  const documentData: UserDocumentData = {
    username: 'johnnycagewins',
    discord: {
      username: 'johnnycagewins',
      avatarUrl: 'https://cdn.discordapp.com/avatars/462798252543049728/6b3df6d9a8b5ab523fa24a71aca8160d.png',
      globalName: undefined,
      id: 'johnnycagewins'
    }
  }
  const snapshot = {
    id: 'userId',
    exists: true,
    data: () => documentData
  } as QueryDocumentSnapshot<UserDocumentData, UserDocumentData>

  it('from Firestore conversion', () => {
    expect(userDataConverter.fromFirestore(snapshot)).toStrictEqual(document)
  })
  it('to Firestore conversion', () => {
    expect(userDataConverter.toFirestore(documentData as WithFieldValue<User>)).toStrictEqual(documentData)
  })
})
