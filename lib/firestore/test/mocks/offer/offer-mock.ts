import type { FirestoreOffer } from '@echo/firestore/types/model/offer/firestore-offer'
import { getNftMockById } from '@echo/firestore-mocks/nft/get-nft-mock-by-id'
import dayjs from 'dayjs'

export const offerMock: Record<string, FirestoreOffer> = {
  LyCfl6Eg7JKuD7XJ6IPi: {
    id: 'LyCfl6Eg7JKuD7XJ6IPi',
    createdAt: dayjs.unix(1676984897),
    expired: false,
    expiresAt: dayjs.unix(2324074781),
    receiver: {
      discordId: '462798252543049728',
      discordUsername: 'johnnycagewins',
      discordAvatar: '6b3df6d9a8b5ab523fa24a71aca8160d',
      username: 'johnnycagewins',
      wallet: {
        address: '0x1E3918dD44F427F056be6C8E132cF1b5F42de59E',
        chainId: 1
      }
    },
    receiverItems: [{ amount: 1, nft: getNftMockById('8hHFadIrrooORfTOLkBg') }],
    sender: {
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
    senderItems: [{ amount: 1, nft: getNftMockById('kRE3UCfXWkJ33nwzj2X1') }],
    state: 'OPEN',
    updatedAt: dayjs.unix(1676984897)
  },
  ASkFpKoHEHVH0gd69t1G: {
    id: 'ASkFpKoHEHVH0gd69t1G',
    createdAt: dayjs.unix(1676984897),
    expiresAt: dayjs.unix(2324074781),
    expired: false,
    receiver: {
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
    receiverItems: [{ amount: 1, nft: getNftMockById('kRE3UCfXWkJ33nwzj2X1') }],
    sender: {
      discordId: '462798252543049728',
      discordUsername: 'johnnycagewins',
      discordAvatar: '6b3df6d9a8b5ab523fa24a71aca8160d',
      username: 'johnnycagewins',
      wallet: {
        address: '0x1E3918dD44F427F056be6C8E132cF1b5F42de59E',
        chainId: 1
      }
    },
    senderItems: [
      { amount: 1, nft: getNftMockById('8hHFadIrrooORfTOLkBg') },
      { amount: 1, nft: getNftMockById('iRZFKEujarikVjpiFAkE') }
    ],
    state: 'COMPLETED',
    updatedAt: dayjs.unix(1676984897)
  }
}
