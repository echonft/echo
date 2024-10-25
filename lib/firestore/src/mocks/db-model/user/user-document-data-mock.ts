import type { UserDocumentData } from '@echo/firestore/types/model/user-document-data'
import { isNil } from 'ramda'

export function userMockCrewId() {
  return 'BrECUMhevHfxABZ1VNOm'
}
export function userMockJohnnyId() {
  return 'oE6yUEQBPn7PZ89yMjKn'
}

export function userDocumentDataMock(): Record<string, UserDocumentData> {
  return {
    BrECUMhevHfxABZ1VNOm: {
      username: 'crewnft_',
      discord: {
        username: 'crewnft_',
        avatarUrl: 'https://cdn.discordapp.com/avatars/884593489189433364/6080eecbd12f0f7bb2299690661535cf.png',
        globalName: 'crew',
        id: 'crewnft_'
      }
    },
    oE6yUEQBPn7PZ89yMjKn: {
      username: 'johnnycagewins',
      discord: {
        username: 'johnnycagewins',
        avatarUrl: 'https://cdn.discordapp.com/avatars/462798252543049728/6b3df6d9a8b5ab523fa24a71aca8160d.png',
        globalName: undefined,
        id: 'johnnycagewins'
      }
    }
  }
}

export function getUserDocumentDataMockById(userId: string) {
  const mock = userDocumentDataMock()[userId]
  if (isNil(mock)) {
    throw Error(`wrong user document data mock id: ${userId}`)
  }
  return mock
}
