import { TokenType } from '@echo/model/constants/token-type'
import { nftCollectionMockPx, nftCollectionMockSpiral } from '@echo/model/mocks/collection-mock'
import { userWithWalletMockCrew, userWithWalletMockJohnny } from '@echo/model/mocks/user-mock'
import type { OwnedErc1155Nft } from '@echo/model/types/owned-erc1155-nft'
import type { OwnedErc721Nft } from '@echo/model/types/owned-erc721-nft'
import type { OwnedNft } from '@echo/model/types/owned-nft'

export const nftMockSpiral1: OwnedNft = {
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
  collection: nftCollectionMockSpiral,
  name: 'Spiral Frequencies #1',
  owner: userWithWalletMockJohnny,
  pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/bc7e85d32d9391374695bc88926b532b',
  tokenId: 1,
  type: TokenType.Erc721
}

export const nftMockSpiral2: OwnedNft = {
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
  collection: nftCollectionMockSpiral,
  name: 'Spiral Frequencies #2',
  owner: userWithWalletMockJohnny,
  pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/c8ced259cc0a40a5a42d22182e82f9de',
  tokenId: 2,
  type: TokenType.Erc721
}

export const nftMockSpiral3: OwnedNft = {
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
  collection: nftCollectionMockSpiral,
  name: 'Spiral Frequencies #3',
  owner: userWithWalletMockCrew,
  pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/f7adbf923a17d9b1f9b33d7a23d2b621',
  tokenId: 3,
  type: TokenType.Erc721
}

export const nftMockPx1: OwnedNft = {
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
  collection: nftCollectionMockPx,
  name: 'Creative Demigod #1',
  owner: userWithWalletMockJohnny,
  pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/c96b4f27dc8dec8a869932f36205bafa',
  tokenId: 1,
  type: TokenType.Erc721
}

export const nftMockPx2: OwnedNft = {
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
  collection: nftCollectionMockPx,
  name: 'Water Elemental #2',
  owner: userWithWalletMockJohnny,
  pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/eaefecb1e422f0f1848058cfdc8a36a9',
  tokenId: 2,
  type: TokenType.Erc721
}

export const nftMockPx3: OwnedNft = {
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
  collection: nftCollectionMockPx,
  name: 'Creative Demigod #3',
  owner: userWithWalletMockCrew,
  pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/d4ccdfe6a54889abc408c34335b6fb55',
  tokenId: 3,
  type: TokenType.Erc721
}

export const nftMocksJohnny: OwnedNft[] = [nftMockSpiral1, nftMockSpiral2, nftMockPx1, nftMockPx2]

export const nftMocksCrew: OwnedNft[] = [nftMockSpiral3, nftMockPx3]

export const erc721NftMock: OwnedErc721Nft = nftMockSpiral1 as OwnedErc721Nft

export const erc1155NftMock: OwnedErc1155Nft = { ...nftMockPx1, tokenId: 4, type: TokenType.Erc1155 }

export const nftMocks: OwnedNft[] = [
  nftMockSpiral1,
  nftMockSpiral2,
  nftMockSpiral3,
  nftMockPx1,
  nftMockPx2,
  nftMockPx3,
  erc1155NftMock
]
