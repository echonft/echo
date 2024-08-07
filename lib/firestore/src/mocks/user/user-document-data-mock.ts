import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import { userMockCrewUsername, userMockJohnnyUsername } from '@echo/model/mocks/user/user-mock'
import { getUserProfileMockByUsername } from '@echo/model/mocks/user/user-profile-mock'
import { assoc, dissoc, isNil, modify, pipe } from 'ramda'

export function userMockCrewId() {
  return '6rECUMhevHfxABZ1VNOm'
}
export function userMockJohnnyId() {
  return 'oE6yUEQBPn7PZ89yMjKn'
}

export function userDocumentDataMock(): Record<string, UserDocumentData> {
  return {
    '6rECUMhevHfxABZ1VNOm': pipe(
      getUserProfileMockByUsername,
      modify('discord', assoc('id', '884593489189433364')),
      dissoc('wallets')
    )(userMockCrewUsername()) as unknown as UserDocumentData,
    oE6yUEQBPn7PZ89yMjKn: pipe(
      getUserProfileMockByUsername,
      modify('discord', assoc('id', '462798252543049728')),
      dissoc('wallets')
    )(userMockJohnnyUsername()) as unknown as UserDocumentData
  }
}

export function getUserDocumentDataMockById(userId: string) {
  const mock = userDocumentDataMock()[userId]
  if (isNil(mock)) {
    throw Error(`wrong user document data mock id: ${userId}`)
  }
  return mock
}
