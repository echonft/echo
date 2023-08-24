import { User } from '@echo/ui-model'
import { NonEmptyArray } from '@echo/utils'

const users: { [key: string]: User } = {
  '6rECUMhevHfxABZ1VNOm': {
    id: '6rECUMhevHfxABZ1VNOm',
    discordId: '884593489189433364',
    discordUsername: 'crewNFT_#2034',
    discordAvatar: '6080eecbd12f0f7bb2299690661535cf',
    discordBanner: '17f80cca207c35c7fa6d0194696c5e7b'
  },
  oE6yUEQBPn7PZ89yMjKn: {
    id: 'oE6yUEQBPn7PZ89yMjKn',
    discordId: '462798252543049728',
    discordUsername: 'johnnycage#0890',
    discordAvatar: '6b3df6d9a8b5ab523fa24a71aca8160d',
    discordBanner: undefined
  }
}

export const getUserById = (id: string) => users[id]!
export const getAllUsers = () => Object.values(users) as NonEmptyArray<User>
