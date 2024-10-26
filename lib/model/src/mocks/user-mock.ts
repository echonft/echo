import type { User } from '@echo/model/types/user'

export const userMockCrew: User = {
  username: 'crewnft_',
  discord: {
    username: 'crewnft_',
    avatarUrl: 'https://cdn.discordapp.com/avatars/884593489189433364/6080eecbd12f0f7bb2299690661535cf.png',
    globalName: 'crew'
  }
}

export const userMockJohnny: User = {
  username: 'johnnycagewins',
  discord: {
    username: 'johnnycagewins',
    avatarUrl: 'https://cdn.discordapp.com/avatars/462798252543049728/6b3df6d9a8b5ab523fa24a71aca8160d.png'
  }
}

export const userMocks = [userMockCrew, userMockJohnny]
