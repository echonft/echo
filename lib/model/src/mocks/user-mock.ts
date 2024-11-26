import type { User } from '@echo/model/types/user'

export const userMockCrew: User = {
  username: 'crewnft_',
  discord: {
    username: 'crewnft_',
    avatarUrl: 'https://cdn.discordapp.com/avatars/884593489189433364/af9b85212f149a6463648752bb657ad8.png',
    globalName: 'crew'
  },
  wallet: '0xf672715f2ba85794659a7150e8c21f8d157bfe1d'
}

export const userMockJohnny: User = {
  username: 'johnnycagewins',
  discord: {
    username: 'johnnycagewins',
    avatarUrl: 'https://cdn.discordapp.com/avatars/462798252543049728/6b3df6d9a8b5ab523fa24a71aca8160d.png'
  },
  wallet: '0x1e3918dd44f427f056be6c8e132cf1b5f42de59e'
}

export const userMocks: User[] = [userMockCrew, userMockJohnny]
