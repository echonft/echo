import type { UserProfile } from '@echo/model/types/user-profile'
import { getWalletMock } from '@echo/model-mocks/wallet/get-wallet-mock'

const userProfileMock: Record<string, UserProfile> = {
  crewnft_: {
    username: 'crewnft_',
    discord: {
      username: 'crewnft_',
      avatarUrl: 'https://cdn.discordapp.com/avatars/884593489189433364/6080eecbd12f0f7bb2299690661535cf.png',
      bannerColor: '#ffffff'
    },
    wallets: []
  },
  johnnycagewins: {
    username: 'johnnycagewins',
    discord: {
      username: 'johnnycagewins',
      avatarUrl: 'https://cdn.discordapp.com/avatars/462798252543049728/6b3df6d9a8b5ab523fa24a71aca8160d.png',
      bannerColor: '#d11bd9'
    },
    wallets: [getWalletMock()]
  }
}

export function getUserProfileMockByUsername(username: string) {
  return userProfileMock[username]!
}
