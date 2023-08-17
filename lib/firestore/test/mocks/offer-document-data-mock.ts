import { OfferDocumentData } from '../../src/types/model/offer-document-data'
import { nftDocumentDataMock } from './nft-document-data-mock'

export const offerDocumentDataMock: { [key: string]: OfferDocumentData } = {
  LyCfl6Eg7JKuD7XJ6IPi: {
    id: 'LyCfl6Eg7JKuD7XJ6IPi',
    activities: [{ date: 1676984897, fromState: undefined, toState: 'OPEN' }],
    createdAt: 1676984897,
    expiresAt: 1676984897,
    receiver: {
      id: 'user1',
      discordId: '462798252543049728',
      discordUsername: 'johnnycage#0890',
      discordAvatar: '6b3df6d9a8b5ab523fa24a71aca8160d',
      discordBanner: undefined,
      wallet: {
        address: '0x1E3918dD44F427F056be6C8E132cF1b5F42de59E',
        addressLowercase: '0x1e3918dd44f427f056be6c8e132cf1b5f42de59e',
        chainId: 1
      }
    },
    receiverItems: [{ amount: 1, ...nftDocumentDataMock['8hHFadIrrooORfTOLkBg']! }],
    sender: {
      id: 'user2',
      discordId: '884593489189433364',
      discordUsername: 'crewNFT_#2034',
      discordAvatar: '6080eecbd12f0f7bb2299690661535cf',
      discordBanner: '17f80cca207c35c7fa6d0194696c5e7b',
      wallet: {
        address: '0xf672715f2bA85794659a7150e8C21F8d157bFe1D',
        addressLowercase: '0xf672715f2ba85794659a7150e8c21f8d157bfe1d',
        chainId: 1
      }
    },
    senderItems: [{ amount: 1, ...nftDocumentDataMock['QFjMRNChUAHNswkRADXh']! }],
    state: 'OPEN',
    threadId: '1231',
    postedAt: undefined
  }
}
