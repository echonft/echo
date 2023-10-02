import type { User } from '@echo/ui/types/model/user'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'

const users: Record<string, User> = {
  '6rECUMhevHfxABZ1VNOm': {
    username: 'crewnft_',
    discord: {
      username: 'crewnft_',
      avatarUrl: 'https://cdn.discordapp.com/avatars/884593489189433364/6080eecbd12f0f7bb2299690661535cf.png'
    },
    wallet: {
      address: '0xf672715f2bA85794659a7150e8C21F8d157bFe1D',
      chainId: 1
    }
  },
  oE6yUEQBPn7PZ89yMjKn: {
    username: 'johnnycagewins',
    discord: {
      username: 'johnnycagewins',
      avatarUrl: 'https://cdn.discordapp.com/avatars/462798252543049728/6b3df6d9a8b5ab523fa24a71aca8160d.png'
    },
    wallet: {
      address: '0xF48cb479671B52E13D0ccA4B3178027D3d1D1ac8',
      chainId: 1
    }
  }
}

export const getUserByUsername = (username: string) => users[username]!
export const getAllUsers = () => Object.values(users) as NonEmptyArray<User>
