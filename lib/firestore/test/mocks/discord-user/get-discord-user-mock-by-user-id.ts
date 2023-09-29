import { getAllDiscordUserMocks } from '@echo/firestore-mocks/discord-user/get-all-discord-user-mocks'
import { find, propEq } from 'ramda'

export function getDiscordUserMockByUserId(userId: string) {
  const mocks = getAllDiscordUserMocks()
  return find(propEq(userId, 'userId'), mocks)!
}
