import { type AuthUser } from '@echo/model/types/auth-user'
import { USER_MOCK_CREW_USERNAME, USER_MOCK_JOHNNY_USERNAME } from '@echo/model-mocks/user/user-mock'
import { isNil } from 'ramda'

const authUserMock: Record<string, AuthUser> = {
  crewnft_: {
    username: USER_MOCK_CREW_USERNAME,
    discord: {
      id: '884593489189433364',
      username: USER_MOCK_CREW_USERNAME,
      avatarUrl: 'https://cdn.discordapp.com/avatars/884593489189433364/6080eecbd12f0f7bb2299690661535cf.png',
      bannerColor: '#ffffff'
    }
  },
  johnnycagewins: {
    username: USER_MOCK_JOHNNY_USERNAME,
    discord: {
      id: '462798252543049728',
      username: USER_MOCK_JOHNNY_USERNAME,
      avatarUrl: 'https://cdn.discordapp.com/avatars/462798252543049728/6b3df6d9a8b5ab523fa24a71aca8160d.png',
      bannerColor: '#d11bd9'
    }
  }
}

export function getAuthUserMockByUsername(username: string) {
  const mock = authUserMock[username]
  if (isNil(mock)) {
    throw Error(`wrong auth user mock username: ${username}`)
  }
  return mock
}
