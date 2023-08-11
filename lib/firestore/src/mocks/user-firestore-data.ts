import { FirestoreUserData } from '../types/model/data/user/firestore-user-data'
import { discordGuildFirestoreData } from './discord-guild-firestore-data'

export const userFirestoreData: { [key: string]: FirestoreUserData } = {
  '6rECUMhevHfxABZ1VNOm': {
    refPath: 'users/6rECUMhevHfxABZ1VNOm',
    id: '6rECUMhevHfxABZ1VNOm',
    discordId: '884593489189433364',
    discordUsername: 'crewNFT_#2034',
    discordGuilds: [discordGuildFirestoreData['Y8GBFtPZKElp44z0k10D']!],
    discordAvatar: '6080eecbd12f0f7bb2299690661535cf',
    discordBanner: '17f80cca207c35c7fa6d0194696c5e7b',
    wallets: [
      {
        address: '0xf672715f2bA85794659a7150e8C21F8d157bFe1D',
        chainId: 1
      }
    ]
  },
  '9tPlFOv1XkR3ng7KI46B': {
    refPath: 'users/9tPlFOv1XkR3ng7KI46B',
    id: '9tPlFOv1XkR3ng7KI46B',
    discordId: '462798252543049728',
    discordUsername: 'johnnycage#0890',
    discordGuilds: [
      discordGuildFirestoreData['xA40abnyBq6qQHSYmtHj']!,
      discordGuildFirestoreData['ncUnbpFfVCofV9bD7ctn']!
    ],
    discordAvatar: '6b3df6d9a8b5ab523fa24a71aca8160d',
    discordBanner: undefined,
    wallets: []
  },
  oE6yUEQBPn7PZ89yMjKn: {
    refPath: 'users/oE6yUEQBPn7PZ89yMjKn',
    id: 'oE6yUEQBPn7PZ89yMjKn',
    discordId: '462798252543049728',
    discordUsername: 'johnnycage#0890',
    discordGuilds: [
      discordGuildFirestoreData['xA40abnyBq6qQHSYmtHj']!,
      discordGuildFirestoreData['ncUnbpFfVCofV9bD7ctn']!
    ],
    discordAvatar: '6b3df6d9a8b5ab523fa24a71aca8160d',
    discordBanner: undefined,
    wallets: [
      {
        address: '0xF48cb479671B52E13D0ccA4B3178027D3d1D1ac8',
        chainId: 1
      },
      {
        address: '0x9e7343Ce1816a7fc21E1c46537F04050F97AfbD9',
        chainId: 1
      },
      {
        address: '0x5f8BF75666a6B4bC452DC4Ac680f0A8Ac35b25DE',
        chainId: 1
      },
      {
        address: '0x1E3918dD44F427F056be6C8E132cF1b5F42de59E',
        chainId: 1
      }
    ]
  },
  xUcl0enoVsuvpsAf9syg: {
    refPath: 'users/xUcl0enoVsuvpsAf9syg',
    id: 'xUcl0enoVsuvpsAf9syg',
    discordId: '460255274461167616',
    discordUsername: 'gabeyc#0',
    discordGuilds: [
      discordGuildFirestoreData['xA40abnyBq6qQHSYmtHj']!,
      discordGuildFirestoreData['ncUnbpFfVCofV9bD7ctn']!
    ],
    discordAvatar: '6b3df6d9a8b5ab523fa24a71aca8160d',
    wallets: [
      {
        address: '0xf672715f2bA85794659a7150e8C21F8d157bFe1D',
        chainId: 1
      }
    ]
  }
}
