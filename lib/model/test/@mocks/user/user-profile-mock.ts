import type { UserProfile } from '@echo/model/types/user-profile'
import { getDiscordProfileMockByUsername } from '@echo/model-mocks/user/discord-profile-mock'
import { USER_MOCK_CREW_USERNAME, USER_MOCK_JOHNNY_USERNAME } from '@echo/model-mocks/user/user-mock'
import { getWalletMockByUsername } from '@echo/model-mocks/wallet/wallet-mock'
import { dissoc, isNil, pipe } from 'ramda'

const userProfileMock: Record<string, UserProfile> = {
  crewnft_: {
    username: USER_MOCK_CREW_USERNAME,
    discord: pipe(getDiscordProfileMockByUsername, dissoc('id'), dissoc('discriminator'))(USER_MOCK_CREW_USERNAME),
    wallets: [getWalletMockByUsername(USER_MOCK_CREW_USERNAME)]
  },
  johnnycagewins: {
    username: USER_MOCK_JOHNNY_USERNAME,
    discord: pipe(getDiscordProfileMockByUsername, dissoc('id'), dissoc('discriminator'))(USER_MOCK_JOHNNY_USERNAME),
    wallets: [getWalletMockByUsername(USER_MOCK_JOHNNY_USERNAME)]
  }
}

export function getUserProfileMockByUsername(username: string) {
  const mock = userProfileMock[username]
  if (isNil(mock)) {
    throw Error(`wrong user profile mock username: ${username}`)
  }
  return mock
}
