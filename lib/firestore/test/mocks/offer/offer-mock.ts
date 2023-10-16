import { getNftMockById } from '@echo/firestore-mocks/nft/get-nft-mock-by-id'
import type { Offer } from '@echo/model/types/offer'
import { getAddress } from 'viem'

export const offerMock: Record<string, Offer> = {
  LyCfl6Eg7JKuD7XJ6IPi: {
    id: 'LyCfl6Eg7JKuD7XJ6IPi',
    createdAt: 1676984897,
    expired: false,
    expiresAt: 2324074781,
    receiver: {
      discord: {
        avatarUrl: 'https://cdn.discordapp.com/avatars/462798252543049728/6b3df6d9a8b5ab523fa24a71aca8160d.png',
        username: 'johnnycagewins'
      },
      username: 'johnnycagewins',
      wallet: {
        address: getAddress('0x1E3918dD44F427F056be6C8E132cF1b5F42de59E', 1),
        chainId: 1
      }
    },
    receiverItems: [{ amount: 1, nft: getNftMockById('8hHFadIrrooORfTOLkBg') }],
    sender: {
      discord: {
        username: 'crewnft_',
        avatarUrl: 'https://cdn.discordapp.com/avatars/884593489189433364/6080eecbd12f0f7bb2299690661535cf.png'
      },
      username: 'crewnft_',
      wallet: {
        address: getAddress('0xf672715f2bA85794659a7150e8C21F8d157bFe1D', 1),
        chainId: 1
      }
    },
    senderItems: [{ amount: 1, nft: getNftMockById('kRE3UCfXWkJ33nwzj2X1') }],
    state: 'OPEN',
    updatedAt: 1676984897
  },
  ASkFpKoHEHVH0gd69t1G: {
    id: 'ASkFpKoHEHVH0gd69t1G',
    createdAt: 1676984897,
    expiresAt: 2324074781,
    expired: false,
    receiver: {
      discord: {
        username: 'crewnft_',
        avatarUrl: 'https://cdn.discordapp.com/avatars/884593489189433364/6080eecbd12f0f7bb2299690661535cf.png'
      },
      username: 'crewnft_',
      wallet: {
        address: getAddress('0xf672715f2bA85794659a7150e8C21F8d157bFe1D', 1),
        chainId: 1
      }
    },
    receiverItems: [{ amount: 1, nft: getNftMockById('kRE3UCfXWkJ33nwzj2X1') }],
    sender: {
      discord: {
        avatarUrl: 'https://cdn.discordapp.com/avatars/462798252543049728/6b3df6d9a8b5ab523fa24a71aca8160d.png',
        username: 'johnnycagewins'
      },
      username: 'johnnycagewins',
      wallet: {
        address: getAddress('0x1E3918dD44F427F056be6C8E132cF1b5F42de59E', 1),
        chainId: 1
      }
    },
    senderItems: [
      { amount: 1, nft: getNftMockById('8hHFadIrrooORfTOLkBg') },
      { amount: 1, nft: getNftMockById('iRZFKEujarikVjpiFAkE') }
    ],
    state: 'COMPLETED',
    updatedAt: 1676984897
  }
}
