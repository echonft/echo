import { type AuthUser } from '@echo/model/types/auth-user'
import { toLower } from 'ramda'

const authUserMock: Record<string, AuthUser> = {
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
    },
    wallets: [{ chainId: 11155111, address: toLower('0x1e3918Dd44F427F056be6c8E132cf1b5f42dE59e') }]
  }
}

export function getAuthUserMockByUsername(username: string) {
  return authUserMock[username]!
}
