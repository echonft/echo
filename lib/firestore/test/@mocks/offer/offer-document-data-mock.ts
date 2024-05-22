import { type OfferDocumentData } from '@echo/firestore/types/model/offer/offer-document-data'
import { OFFER_STATE_COMPLETED, OFFER_STATE_OPEN } from '@echo/model/constants/offer-states'
import { getNftIndexMockById } from '@echo/model-mocks/nft/get-nft-index-mock-by-id'
import { getNftMockById } from '@echo/model-mocks/nft/get-nft-mock-by-id'
import { toLower } from 'ramda'

export const offerDocumentDataMock: Record<string, OfferDocumentData> = {
  LyCfl6Eg7JKuD7XJ6IPi: {
    createdAt: 1676984897,
    expiresAt: 2324074781,
    idContract: 'LyCfl6Eg7JKuD7XJ6IPi',
    receiver: {
      discord: {
        avatarUrl: 'https://cdn.discordapp.com/avatars/462798252543049728/6b3df6d9a8b5ab523fa24a71aca8160d.png',
        username: 'johnnycagewins'
      },
      username: 'johnnycagewins',
      wallet: {
        address: toLower('0x1E3918dD44F427F056be6C8E132cF1b5F42de59E'),
        chain: 'ethereum'
      }
    },
    receiverItems: [getNftMockById('8hHFadIrrooORfTOLkBg')],
    receiverItemIndexes: [getNftIndexMockById('8hHFadIrrooORfTOLkBg')],
    receiverItemCollections: ['spiral-frequencies'],
    sender: {
      discord: {
        username: 'crewnft_',
        avatarUrl: 'https://cdn.discordapp.com/avatars/884593489189433364/6080eecbd12f0f7bb2299690661535cf.png'
      },
      username: 'crewnft_',
      wallet: {
        address: toLower('0xf672715f2bA85794659a7150e8C21F8d157bFe1D'),
        chain: 'ethereum'
      }
    },
    senderItems: [getNftMockById('kRE3UCfXWkJ33nwzj2X1')],
    senderItemIndexes: [getNftIndexMockById('kRE3UCfXWkJ33nwzj2X1')],
    senderItemCollections: ['pxmythics-genesis'],
    slug: toLower('LyCfl6Eg7JKuD7XJ6IPi'),
    state: OFFER_STATE_OPEN,
    updatedAt: 1676984897
  },
  ASkFpKoHEHVH0gd69t1G: {
    createdAt: 1676984897,
    expiresAt: 2324074781,
    idContract: 'ASkFpKoHEHVH0gd69t1G',
    receiver: {
      discord: {
        username: 'crewnft_',
        avatarUrl: 'https://cdn.discordapp.com/avatars/884593489189433364/6080eecbd12f0f7bb2299690661535cf.png'
      },
      username: 'crewnft_',
      wallet: {
        address: toLower('0xf672715f2bA85794659a7150e8C21F8d157bFe1D'),
        chain: 'ethereum'
      }
    },
    receiverItems: [getNftMockById('kRE3UCfXWkJ33nwzj2X1')],
    receiverItemIndexes: [getNftIndexMockById('kRE3UCfXWkJ33nwzj2X1')],
    receiverItemCollections: ['pxmythics-genesis'],
    sender: {
      discord: {
        avatarUrl: 'https://cdn.discordapp.com/avatars/462798252543049728/6b3df6d9a8b5ab523fa24a71aca8160d.png',
        username: 'johnnycagewins'
      },
      username: 'johnnycagewins',
      wallet: {
        address: toLower('0x1E3918dD44F427F056be6C8E132cF1b5F42de59E'),
        chain: 'ethereum'
      }
    },
    senderItems: [getNftMockById('8hHFadIrrooORfTOLkBg'), getNftMockById('iRZFKEujarikVjpiFAkE')],
    senderItemIndexes: [getNftIndexMockById('8hHFadIrrooORfTOLkBg'), getNftIndexMockById('iRZFKEujarikVjpiFAkE')],
    senderItemCollections: ['spiral-frequencies'],
    slug: toLower('ASkFpKoHEHVH0gd69t1G'),
    state: OFFER_STATE_COMPLETED,
    updatedAt: 1676984897
  }
}
