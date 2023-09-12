import { getNftById } from './nft'
import type { Offer } from '@echo/ui-model'
import type { NonEmptyArray } from '@echo/utils/types'
import dayjs from 'dayjs'

const offers: { [key: string]: Offer } = {
  LyCfl6Eg7JKuD7XJ6IPi: {
    id: 'LyCfl6Eg7JKuD7XJ6IPi',
    createdAt: dayjs.unix(1676984897),
    expired: true,
    expiresAt: dayjs.unix(1676984897),
    receiver: {
      id: 'oE6yUEQBPn7PZ89yMjKn',
      discordId: '462798252543049728',
      discordUsername: 'johnnycagewins',
      discordAvatar: '6b3df6d9a8b5ab523fa24a71aca8160d',
      discordBanner: undefined,
      username: 'johnnycagewins',
      wallet: {
        address: '0x1E3918dD44F427F056be6C8E132cF1b5F42de59E',
        chainId: 1
      }
    },
    receiverItems: [{ amount: 1, nft: getNftById('8hHFadIrrooORfTOLkBg') }],
    sender: {
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
    senderItems: [{ amount: 1, nft: getNftById('kRE3UCfXWkJ33nwzj2X1') }],
    state: 'OPEN'
  }
}

export const getOfferById = (id: string) => offers[id]!
export const getAllOffers = () => Object.values(offers) as NonEmptyArray<Offer>
