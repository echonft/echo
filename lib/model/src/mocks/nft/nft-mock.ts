import { TokenType } from '@echo/model/constants/token-type'
import { nftCollection } from '@echo/model/mappers/nft/nft-collection'
import { collectionMockPxId, collectionMockSpiralId } from '@echo/model/mocks/collection/collection-mock'
import { getCollectionMockById } from '@echo/model/mocks/collection/get-collection-mock-by-id'
import { getUserMockByUsername, userMockCrewUsername, userMockJohnnyUsername } from '@echo/model/mocks/user/user-mock'

import type { OwnedNft } from '@echo/model/types/nft/owned-nft'
import { pipe } from 'ramda'

export function nftMockSpiralJohnnyId() {
  return '8hHFadIrrooORfTOLkBg'
}
export function nftMockSpiralJohnny2Id() {
  return 'iRZFKEujarikVjpiFAkE'
}
export function nftMockSpiralCrewId() {
  return '5SeF1NSN5uPUxtWSr516'
}

export function nftMockPxJohnnyId() {
  return 'QFjMRNChUAHNswkRADXh'
}
export function nftMockPxJohnny2Id() {
  return 'XiDa6k2P7gxXCKSxn2wq'
}
export function nftMockPxCrewId() {
  return 'kRE3UCfXWkJ33nwzj2X1'
}

export function nftMock(): Record<string, OwnedNft> {
  return {
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
      collection: pipe(collectionMockSpiralId, getCollectionMockById, nftCollection)(),
      tokenIdLabel: '#0001',
      name: 'Spiral Frequencies #1',
      owner: getUserMockByUsername(userMockJohnnyUsername()),
      metadataUrl: 'https://metadata.url/',
      pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/bc7e85d32d9391374695bc88926b532b',
      tokenId: 1,
      type: TokenType.Erc721
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
      collection: pipe(collectionMockSpiralId, getCollectionMockById, nftCollection)(),
      tokenIdLabel: '#0002',
      name: 'Spiral Frequencies #2',
      owner: getUserMockByUsername(userMockJohnnyUsername()),
      metadataUrl: 'https://metadata.url/',
      pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/c8ced259cc0a40a5a42d22182e82f9de',
      tokenId: 2,
      type: TokenType.Erc721
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
      collection: pipe(collectionMockSpiralId, getCollectionMockById, nftCollection)(),
      tokenIdLabel: '#0003',
      name: 'Spiral Frequencies #3',
      owner: getUserMockByUsername(userMockCrewUsername()),
      metadataUrl: 'https://metadata.url/',
      pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/f7adbf923a17d9b1f9b33d7a23d2b621',
      tokenId: 3,
      type: TokenType.Erc721
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
      collection: pipe(collectionMockPxId, getCollectionMockById, nftCollection)(),
      tokenIdLabel: '#0001',
      name: 'Creative Demigod #1',
      owner: getUserMockByUsername(userMockJohnnyUsername()),
      animationUrl: 'https://animation.url/',
      metadataUrl: 'https://metadata.url/',
      pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/c96b4f27dc8dec8a869932f36205bafa',
      tokenId: 1,
      type: TokenType.Erc721
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
      collection: pipe(collectionMockPxId, getCollectionMockById, nftCollection)(),
      tokenIdLabel: '#0002',
      name: 'Water Elemental #2',
      owner: getUserMockByUsername(userMockJohnnyUsername()),
      animationUrl: 'https://animation.url/',
      metadataUrl: 'https://metadata.url/',
      pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/eaefecb1e422f0f1848058cfdc8a36a9',
      tokenId: 2,
      type: TokenType.Erc721
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
      collection: pipe(collectionMockPxId, getCollectionMockById, nftCollection)(),
      tokenIdLabel: '#0003',
      name: 'Creative Demigod #3',
      owner: getUserMockByUsername(userMockCrewUsername()),
      animationUrl: 'https://animation.url/',
      metadataUrl: 'https://metadata.url/',
      pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/d4ccdfe6a54889abc408c34335b6fb55',
      tokenId: 3,
      type: TokenType.Erc721
    }
  }
}
