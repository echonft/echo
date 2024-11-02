import { walletMockCrew, walletMockJohnny } from '@echo/model/mocks/wallet-mock'
import type { User } from '@echo/model/types/user'

export const userMockCrew: User & Required<Pick<User, 'wallet'>> = {
  username: 'crewnft_',
  discord: {
    username: 'crewnft_',
    avatarUrl: 'https://cdn.discordapp.com/avatars/884593489189433364/6080eecbd12f0f7bb2299690661535cf.png',
    globalName: 'crew'
  },
  wallet: walletMockCrew
}

export const userMockJohnny: User & Required<Pick<User, 'wallet'>> = {
  username: 'johnnycagewins',
  discord: {
    username: 'johnnycagewins',
    avatarUrl: 'https://cdn.discordapp.com/avatars/462798252543049728/6b3df6d9a8b5ab523fa24a71aca8160d.png'
  },
  wallet: walletMockJohnny
}

export const userMocks: User[] = [userMockCrew, userMockJohnny]
