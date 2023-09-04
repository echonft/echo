import { OfferDocumentData } from '../../src/types/model/offer-document-data'
import { nftDocumentDataMock } from './nft-document-data-mock'

export const offerDocumentDataMock: { [key: string]: OfferDocumentData } = {
  LyCfl6Eg7JKuD7XJ6IPi: {
    id: 'LyCfl6Eg7JKuD7XJ6IPi',
    createdAt: 1676984897,
    expiresAt: 2324074781,
    listingsIds: ['jUzMtPGKM62mMhEcmbN4'],
    receiver: {
      id: 'oE6yUEQBPn7PZ89yMjKn',
      discordId: '462798252543049728',
      discordUsername: 'johnnycage#0890',
      discordAvatar: '6b3df6d9a8b5ab523fa24a71aca8160d',
      wallet: {
        address: '0x1E3918dD44F427F056be6C8E132cF1b5F42de59E',
        chainId: 1
      }
    },
    receiverId: 'oE6yUEQBPn7PZ89yMjKn',
    receiverItems: [{ amount: 1, nft: nftDocumentDataMock['8hHFadIrrooORfTOLkBg']! }],
    receiverItemsNftIds: ['8hHFadIrrooORfTOLkBg'],
    sender: {
      id: '6rECUMhevHfxABZ1VNOm',
      discordId: '884593489189433364',
      discordUsername: 'crewNFT_#2034',
      discordAvatar: '6080eecbd12f0f7bb2299690661535cf',
      discordBanner: '17f80cca207c35c7fa6d0194696c5e7b',
      wallet: {
        address: '0xf672715f2bA85794659a7150e8C21F8d157bFe1D',
        chainId: 1
      }
    },
    senderId: '6rECUMhevHfxABZ1VNOm',
    senderItems: [{ amount: 1, nft: nftDocumentDataMock['kRE3UCfXWkJ33nwzj2X1']! }],
    senderItemsNftIds: ['kRE3UCfXWkJ33nwzj2X1'],
    state: 'OPEN'
  }
}
