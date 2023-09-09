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
      discordUsername: 'johnnycagewins',
      discordAvatar: '6b3df6d9a8b5ab523fa24a71aca8160d',
      username: 'johnnycagewins',
      wallet: {
        address: '0x1E3918dD44F427F056be6C8E132cF1b5F42de59E',
        chainId: 1
      }
    },
    receiverId: 'oE6yUEQBPn7PZ89yMjKn',
    receiverItems: [{ amount: 1, nft: nftDocumentDataMock['8hHFadIrrooORfTOLkBg']! }],
    receiverItemsNftIds: ['8hHFadIrrooORfTOLkBg'],
    receiverItemsNftCollectionIds: ['1aomCtnoesD7WVll6Yi1'],
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
    senderId: '6rECUMhevHfxABZ1VNOm',
    senderItems: [{ amount: 1, nft: nftDocumentDataMock['kRE3UCfXWkJ33nwzj2X1']! }],
    senderItemsNftIds: ['kRE3UCfXWkJ33nwzj2X1'],
    senderItemsNftCollectionIds: ['Rc8pLQXxgyQGIRL0fr13'],
    state: 'OPEN'
  },
  ASkFpKoHEHVH0gd69t1G: {
    id: 'ASkFpKoHEHVH0gd69t1G',
    createdAt: 1676984897,
    expiresAt: 2324074781,
    listingsIds: [],
    receiver: {
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
    receiverId: '6rECUMhevHfxABZ1VNOm',
    receiverItems: [{ amount: 1, nft: nftDocumentDataMock['kRE3UCfXWkJ33nwzj2X1']! }],
    receiverItemsNftIds: ['kRE3UCfXWkJ33nwzj2X1'],
    receiverItemsNftCollectionIds: ['Rc8pLQXxgyQGIRL0fr13'],
    sender: {
      id: 'oE6yUEQBPn7PZ89yMjKn',
      discordId: '462798252543049728',
      discordUsername: 'johnnycagewins',
      discordAvatar: '6b3df6d9a8b5ab523fa24a71aca8160d',
      username: 'johnnycagewins',
      wallet: {
        address: '0x1E3918dD44F427F056be6C8E132cF1b5F42de59E',
        chainId: 1
      }
    },
    senderId: 'oE6yUEQBPn7PZ89yMjKn',
    senderItems: [
      { amount: 1, nft: nftDocumentDataMock['8hHFadIrrooORfTOLkBg']! },
      { amount: 1, nft: nftDocumentDataMock['iRZFKEujarikVjpiFAkE']! }
    ],
    senderItemsNftIds: ['8hHFadIrrooORfTOLkBg', 'iRZFKEujarikVjpiFAkE'],
    senderItemsNftCollectionIds: ['1aomCtnoesD7WVll6Yi1'],
    state: 'COMPLETED'
  }
}
