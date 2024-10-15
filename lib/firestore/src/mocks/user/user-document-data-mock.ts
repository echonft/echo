import type { UserDocumentData } from '@echo/firestore/types/model/user-document-data'
import { getDiscordProfileMockByUsername } from '@echo/model/mocks/user/discord-profile-mock'
import { userMockCrewUsername, userMockJohnnyUsername } from '@echo/model/mocks/user/user-mock'
import { isNil, pipe } from 'ramda'

export function userMockCrewId() {
  return '6rECUMhevHfxABZ1VNOm'
}
export function userMockJohnnyId() {
  return 'oE6yUEQBPn7PZ89yMjKn'
}

export function userDocumentDataMock(): Record<string, UserDocumentData> {
  return {
    '6rECUMhevHfxABZ1VNOm': {
      username: userMockCrewUsername(),
      discord: pipe(userMockCrewUsername, getDiscordProfileMockByUsername)()
    },
    oE6yUEQBPn7PZ89yMjKn: {
      username: userMockJohnnyUsername(),
      discord: pipe(userMockJohnnyUsername, getDiscordProfileMockByUsername)()
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
