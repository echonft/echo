import { FirestoreDiscordUser } from '@echo/firestore/types/model/firestore-discord-user'
import { getAllDiscordUserMocks } from '@echo/firestore-mocks/get-all-discord-user-mocks'
import { find, propEq } from 'ramda'

export function getDiscordUserMockByUserId(userId: string) {
  const mocks = getAllDiscordUserMocks()
  return find(propEq(userId, 'userId'), mocks) as FirestoreDiscordUser
}
