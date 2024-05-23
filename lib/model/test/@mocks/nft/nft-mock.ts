import { type Nft } from '@echo/model/types/nft'
import { COLLECTION_MOCK_PX_ID, COLLECTION_MOCK_SPIRAL_ID } from '@echo/model-mocks/collection/collection-mock'
import { getCollectionMockById } from '@echo/model-mocks/collection/get-collection-mock-by-id'
import {
  getUserMockByUsername,
  USER_MOCK_CREW_USERNAME,
  USER_MOCK_JOHNNY_USERNAME
} from '@echo/model-mocks/user/user-mock'

export const NFT_MOCK_SPIRAL_JOHNNY_ID = '8hHFadIrrooORfTOLkBg'
export const NFT_MOCK_SPIRAL_JOHNNY_2_ID = 'iRZFKEujarikVjpiFAkE'
export const NFT_MOCK_SPIRAL_CREW_ID = '5SeF1NSN5uPUxtWSr516'

export const NFT_MOCK_PX_JOHNNY_ID = 'QFjMRNChUAHNswkRADXh'
export const NFT_MOCK_PX_JOHNNY_2_ID = 'XiDa6k2P7gxXCKSxn2wq'
export const NFT_MOCK_PX_CREW_ID = 'kRE3UCfXWkJ33nwzj2X1'

export const nftMock: Record<string, Nft> = {
  '8hHFadIrrooORfTOLkBg': {
    attributes: [
      { value: 'archimedean', trait: 'Algorithm' },
      { value: 'main', trait: 'Ring' },
      { value: 'movie', trait: 'Animation' },
      { value: '5', trait: 'Speed' },
      { value: 'cumulus', trait: 'Density' },
      { value: '0001', trait: 'Colors' },
      { value: 'random1', trait: 'Palette' },
      { value: '#complement', trait: 'Background' }
    ],
    animationUrl: 'https://animation.url/',
    collection: getCollectionMockById(COLLECTION_MOCK_SPIRAL_ID),
    name: 'Spiral Frequencies #1',
    owner: getUserMockByUsername(USER_MOCK_JOHNNY_USERNAME),
    metadataUrl: 'https://metadata.url/',
    pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/bc7e85d32d9391374695bc88926b532b',
    tokenId: 1,
    updatedAt: 1676984897
  },
  iRZFKEujarikVjpiFAkE: {
    attributes: [
      {
        value: 'hyperbolic',
        trait: 'Algorithm'
      },
      {
        value: 'main',
        trait: 'Ring'
      },
      {
        value: 'short',
        trait: 'Animation'
      },
      {
        value: '5',
        trait: 'Speed'
      },
      {
        value: 'cumulus',
        trait: 'Density'
      },
      {
        value: '0001',
        trait: 'Colors'
      },
      {
        value: 'random1',
        trait: 'Palette'
      },
      {
        value: '#complement',
        trait: 'Background'
      }
    ],
    animationUrl: 'https://animation.url/',
    collection: getCollectionMockById(COLLECTION_MOCK_SPIRAL_ID),
    name: 'Spiral Frequencies #2',
    owner: getUserMockByUsername(USER_MOCK_JOHNNY_USERNAME),
    metadataUrl: 'https://metadata.url/',
    pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/c8ced259cc0a40a5a42d22182e82f9de',
    tokenId: 2,
    updatedAt: 1676984897
  },
  '5SeF1NSN5uPUxtWSr516': {
    attributes: [
      {
        value: 'fermat',
        trait: 'Algorithm'
      },
      {
        value: 'halo',
        trait: 'Ring'
      },
      {
        value: 'opera',
        trait: 'Animation'
      },
      {
        value: '5',
        trait: 'Speed'
      },
      {
        value: 'cumulus',
        trait: 'Density'
      },
      {
        value: '0011',
        trait: 'Colors'
      },
      {
        value: 'pasture3',
        trait: 'Palette'
      },
      {
        value: '#777777',
        trait: 'Background'
      }
    ],
    animationUrl: 'https://animation.url/',
    collection: getCollectionMockById(COLLECTION_MOCK_SPIRAL_ID),
    name: 'Spiral Frequencies #3',
    owner: getUserMockByUsername(USER_MOCK_CREW_USERNAME),
    metadataUrl: 'https://metadata.url/',
    pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/f7adbf923a17d9b1f9b33d7a23d2b621',
    tokenId: 3,
    updatedAt: 1676984897
  },
  QFjMRNChUAHNswkRADXh: {
    attributes: [
      {
        value: 'Creative',
        trait: 'Demigod'
      },
      {
        value: 'Sunkissed',
        trait: 'Skin'
      },
      {
        value: 'White',
        trait: 'Eyes'
      },
      {
        value: 'Ruby Secret Order',
        trait: 'Clothes'
      },
      {
        value: 'Mark Of Power Gold',
        trait: 'Tattoo'
      },
      {
        value: 'The Genius',
        trait: 'Hair'
      },
      {
        value: 'Blue Gradiant',
        trait: 'Background'
      },
      {
        value: 'Feathered Wings',
        trait: 'Wings'
      },
      {
        value: 'Kiwi Retrowave',
        trait: 'Eye Accessory'
      },
      {
        value: 'Dashing Dandy',
        trait: 'Beard'
      },
      {
        value: 'Silver Mystic',
        trait: 'Crown'
      },
      {
        value: 'Bronze And Gold',
        trait: 'Halo'
      }
    ],
    collection: getCollectionMockById(COLLECTION_MOCK_PX_ID),
    name: 'Creative Demigod #1',
    owner: getUserMockByUsername(USER_MOCK_JOHNNY_USERNAME),
    animationUrl: 'https://animation.url/',
    metadataUrl: 'https://metadata.url/',
    pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/c96b4f27dc8dec8a869932f36205bafa',
    tokenId: 1,
    updatedAt: 1676984897
  },
  XiDa6k2P7gxXCKSxn2wq: {
    attributes: [
      {
        value: 'Water',
        trait: 'Elemental'
      },
      {
        value: 'Battle',
        trait: 'Eyes'
      },
      {
        value: 'Gentle Waterfall',
        trait: 'Hair'
      },
      {
        value: 'Indigo Fin',
        trait: 'Crown'
      },
      {
        value: 'Green Jade Warrior',
        trait: 'Clothing'
      },
      {
        value: 'Angelite Kitsune',
        trait: 'Face Mask'
      },
      {
        value: 'Red Gradiant',
        trait: 'Background'
      },
      {
        value: 'Water Base',
        trait: 'Skin'
      },
      {
        value: 'Mark Of Tide Blue',
        trait: 'Tattoo'
      }
    ],
    collection: getCollectionMockById(COLLECTION_MOCK_PX_ID),
    name: 'Water Elemental #2',
    owner: getUserMockByUsername(USER_MOCK_JOHNNY_USERNAME),
    animationUrl: 'https://animation.url/',
    metadataUrl: 'https://metadata.url/',
    pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/eaefecb1e422f0f1848058cfdc8a36a9',
    tokenId: 2,
    updatedAt: 1676984897
  },
  kRE3UCfXWkJ33nwzj2X1: {
    attributes: [
      {
        value: 'Creative',
        trait: 'Demigod'
      },
      {
        value: 'Blue Opal Champion',
        trait: 'Clothes'
      },
      {
        value: 'Pine Forest',
        trait: 'Background'
      },
      {
        value: 'Feathered Wings',
        trait: 'Wings'
      },
      {
        value: 'Sunkissed',
        trait: 'Skin'
      },
      {
        value: 'Mark Of Power Purple',
        trait: 'Tattoo'
      },
      {
        value: 'Silver And Gold',
        trait: 'Halo'
      },
      {
        value: 'The Genius',
        trait: 'Hair'
      },
      {
        value: 'Gold',
        trait: 'Eyes'
      },
      {
        value: 'The Sage',
        trait: 'Beard'
      }
    ],
    collection: getCollectionMockById(COLLECTION_MOCK_PX_ID),
    name: 'Creative Demigod #3',
    owner: getUserMockByUsername(USER_MOCK_CREW_USERNAME),
    animationUrl: 'https://animation.url/',
    metadataUrl: 'https://metadata.url/',
    pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/d4ccdfe6a54889abc408c34335b6fb55',
    tokenId: 3,
    updatedAt: 1676984897
  }
}
