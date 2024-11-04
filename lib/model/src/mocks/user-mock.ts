import type { User } from '@echo/model/types/user'

export const userMockCrew: User & Required<Pick<User, 'wallet'>> = {
  username: 'crewnft_',
  discord: {
    username: 'crewnft_',
    avatarUrl: 'https://cdn.discordapp.com/avatars/884593489189433364/6080eecbd12f0f7bb2299690661535cf.png',
    globalName: 'crew'
  },
  wallet: '0xf672715f2ba85794659a7150e8c21f8d157bfe1d'
}

export const userMockJohnny: User & Required<Pick<User, 'wallet'>> = {
  username: 'johnnycagewins',
  discord: {
    username: 'johnnycagewins',
    avatarUrl: 'https://cdn.discordapp.com/avatars/462798252543049728/6b3df6d9a8b5ab523fa24a71aca8160d.png'
  },
  wallet: '0x1e3918dd44f427f056be6c8e132cf1b5f42de59e'
}

export const userMocks: User[] = [userMockCrew, userMockJohnny]
