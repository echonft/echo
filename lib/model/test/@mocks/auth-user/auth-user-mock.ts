import { type AuthUser } from '@echo/model/types/auth-user'

export const authUserMock: Record<string, AuthUser> = {
  crewnft_: {
    username: 'crewnft_',
    discord: {
      id: '884593489189433364',
      username: 'crewnft_',
      avatarUrl: 'https://cdn.discordapp.com/avatars/884593489189433364/6080eecbd12f0f7bb2299690661535cf.png',
      bannerColor: '#ffffff'
    }
  },
  johnnycagewins: {
    username: 'johnnycagewins',
    discord: {
      id: '462798252543049728',
      username: 'johnnycagewins',
      avatarUrl: 'https://cdn.discordapp.com/avatars/462798252543049728/6b3df6d9a8b5ab523fa24a71aca8160d.png',
      bannerColor: '#d11bd9'
    }
  }
}

export function getAuthUserMockByUsername(username: string) {
  return authUserMock[username]!
}
