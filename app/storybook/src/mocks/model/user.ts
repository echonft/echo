import type { User } from '@echo/ui-model'
import type { NonEmptyArray } from '@echo/utils/types'

const users: { [key: string]: User } = {
  '6rECUMhevHfxABZ1VNOm': {
    id: '6rECUMhevHfxABZ1VNOm',
    discordId: '884593489189433364',
    discordUsername: 'crewnft_',
    discordAvatar: '6080eecbd12f0f7bb2299690661535cf',
    discordBanner: '17f80cca207c35c7fa6d0194696c5e7b',
    username: 'crewnft_',
    wallet: {
      address: '0xf672715f2bA85794659a7150e8C21F8d157bFe1D',
      chainId: 1
    }
  },
  oE6yUEQBPn7PZ89yMjKn: {
    id: 'oE6yUEQBPn7PZ89yMjKn',
    discordId: '462798252543049728',
    discordUsername: 'johnnycagewins',
    discordAvatar: '6b3df6d9a8b5ab523fa24a71aca8160d',
    discordBanner: undefined,
    username: 'johnnycagewins',
    wallet: {
      address: '0xF48cb479671B52E13D0ccA4B3178027D3d1D1ac8',
      chainId: 1
    }
  }
}

export const getUserById = (id: string) => users[id]!
export const getAllUsers = () => Object.values(users) as NonEmptyArray<User>
