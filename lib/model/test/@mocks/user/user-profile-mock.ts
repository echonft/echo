import type { UserProfile } from '@echo/model/types/user-profile'
import { USER_MOCK_CREW_USERNAME, USER_MOCK_JOHNNY_USERNAME } from '@echo/model-mocks/user/user-mock'
import { getWalletMockByUsername } from '@echo/model-mocks/wallet/wallet-mock'
import { isNil } from 'ramda'

const userProfileMock: Record<string, UserProfile> = {
  crewnft_: {
    username: USER_MOCK_CREW_USERNAME,
    discord: {
      username: USER_MOCK_CREW_USERNAME,
      avatarUrl: 'https://cdn.discordapp.com/avatars/884593489189433364/6080eecbd12f0f7bb2299690661535cf.png',
      bannerColor: '#ffffff'
    },
    wallets: [getWalletMockByUsername(USER_MOCK_CREW_USERNAME)]
  },
  johnnycagewins: {
    username: USER_MOCK_JOHNNY_USERNAME,
    discord: {
      username: USER_MOCK_JOHNNY_USERNAME,
      avatarUrl: 'https://cdn.discordapp.com/avatars/462798252543049728/6b3df6d9a8b5ab523fa24a71aca8160d.png',
      bannerColor: '#d11bd9'
    },
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
