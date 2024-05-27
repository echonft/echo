import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import { USER_MOCK_CREW_USERNAME, USER_MOCK_JOHNNY_USERNAME } from '@echo/model-mocks/user/user-mock'
import { getUserProfileMockByUsername } from '@echo/model-mocks/user/user-profile-mock'
import { assoc, dissoc, isNil, modify, pipe } from 'ramda'

export const USER_MOCK_CREW_ID = '6rECUMhevHfxABZ1VNOm'
export const USER_MOCK_JOHNNY_ID = 'oE6yUEQBPn7PZ89yMjKn'

export const userDocumentDataMock: Record<string, UserDocumentData> = {
  '6rECUMhevHfxABZ1VNOm': pipe(
    getUserProfileMockByUsername,
    assoc('createdAt', 1705018267962),
    modify('discord', assoc('id', '884593489189433364')),
    assoc('updatedAt', 1705018267962),
    dissoc('wallets')
  )(USER_MOCK_CREW_USERNAME) as unknown as UserDocumentData,
  oE6yUEQBPn7PZ89yMjKn: pipe(
    getUserProfileMockByUsername,
    assoc('createdAt', 1705018267962),
    modify('discord', assoc('id', '462798252543049728')),
    assoc('updatedAt', 1705018267962),
    dissoc('wallets')
  )(USER_MOCK_JOHNNY_USERNAME) as unknown as UserDocumentData
}

export function getUserDocumentDataMockById(userId: string) {
  const mock = userDocumentDataMock[userId]
  if (isNil(mock)) {
    throw Error(`wrong user document data mock id: ${userId}`)
  }
  return mock
}
