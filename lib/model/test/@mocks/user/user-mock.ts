import type { User } from '@echo/model/types/user'
import { getWalletMockByUsername } from '@echo/model-mocks/wallet/wallet-mock'
import { isNil } from 'ramda'

export const USER_MOCK_CREW_USERNAME = 'crewnft_'
export const USER_MOCK_JOHNNY_USERNAME = 'johnnycagewins'

const userMock: Record<string, User> = {
  crewnft_: {
    username: USER_MOCK_CREW_USERNAME,
    discord: {
      username: USER_MOCK_CREW_USERNAME,
      avatarUrl: 'https://cdn.discordapp.com/avatars/884593489189433364/6080eecbd12f0f7bb2299690661535cf.png'
    },
    wallet: getWalletMockByUsername(USER_MOCK_CREW_USERNAME)
  },
  johnnycagewins: {
    username: USER_MOCK_JOHNNY_USERNAME,
    discord: {
      username: USER_MOCK_JOHNNY_USERNAME,
      avatarUrl: 'https://cdn.discordapp.com/avatars/462798252543049728/6b3df6d9a8b5ab523fa24a71aca8160d.png'
    },
    wallet: getWalletMockByUsername(USER_MOCK_JOHNNY_USERNAME)
  }
}

export function getUserMockByUsername(username: string) {
  const mock = userMock[username]
  if (isNil(mock)) {
    throw Error(`wrong user mock username: ${username}`)
  }
  return mock
}
