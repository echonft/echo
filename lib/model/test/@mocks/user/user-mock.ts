import type { User } from '@echo/model/types/user'
import { getDiscordProfileMockByUsername } from '@echo/model-mocks/user/discord-profile-mock'
import { getWalletMockByUsername } from '@echo/model-mocks/wallet/wallet-mock'
import { isNil } from 'ramda'

export const USER_MOCK_CREW_USERNAME = 'crewnft_'
export const USER_MOCK_JOHNNY_USERNAME = 'johnnycagewins'

export function getUserMockByUsername(username: string) {
  const userMock: Record<string, User> = {
    crewnft_: {
      username: USER_MOCK_CREW_USERNAME,
      discord: getDiscordProfileMockByUsername(USER_MOCK_CREW_USERNAME),
      wallet: getWalletMockByUsername(USER_MOCK_CREW_USERNAME)
    },
    johnnycagewins: {
      username: USER_MOCK_JOHNNY_USERNAME,
      discord: getDiscordProfileMockByUsername(USER_MOCK_JOHNNY_USERNAME),
      wallet: getWalletMockByUsername(USER_MOCK_JOHNNY_USERNAME)
    }
  }

  const mock = userMock[username]
  if (isNil(mock)) {
    throw Error(`wrong user mock username: ${username}`)
  }
  return mock
}
