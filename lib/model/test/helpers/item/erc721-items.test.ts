import { TokenType } from '@echo/model/constants/token-type'
import { erc721Items } from '@echo/model/helpers/item/erc721-items'
import { nftCollection } from '@echo/model/mappers/nft/nft-collection'
import { collectionMockSpiralId } from '@echo/model/mocks/collection/collection-mock'
import { getCollectionMockById } from '@echo/model/mocks/collection/get-collection-mock-by-id'
import { getUserMockByUsername, userMockJohnnyUsername } from '@echo/model/mocks/user/user-mock'
import type { Erc1155Item } from '@echo/model/types/item/erc1155-item'
import type { Erc20Item } from '@echo/model/types/item/erc20-item'
import type { Erc721Item } from '@echo/model/types/item/erc721-item'
import type { Erc1155Nft } from '@echo/model/types/nft/erc1155-nft'
import type { Erc721Nft } from '@echo/model/types/nft/erc721-nft'
import { describe, expect, test } from '@jest/globals'
import { assocPath, dissoc, pipe } from 'ramda'

describe('helpers - item - erc721Items', () => {
  const erc: Erc721Nft = {
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
    owner: pipe(userMockJohnnyUsername, getUserMockByUsername)(),
    metadataUrl: 'https://metadata.url/',
    pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/bc7e85d32d9391374695bc88926b532b',
    tokenId: 1,
    type: TokenType.Erc721
  }
  const erc721Item: Erc721Item = {
    token: {
      contract: erc.collection.contract,
      animationUrl: 'https://animation.url/',
      collection: dissoc('contract', erc.collection),
      tokenIdLabel: '#0001',
      name: 'Spiral Frequencies #1',
      metadataUrl: 'https://metadata.url/',
      pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/bc7e85d32d9391374695bc88926b532b',
      tokenId: 1,
      type: TokenType.Erc721
    }
  }
  const erc1155Nft: Erc1155Nft = {
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
    owner: pipe(userMockJohnnyUsername, getUserMockByUsername)(),
    metadataUrl: 'https://metadata.url/',
    pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/bc7e85d32d9391374695bc88926b532b',
    tokenId: 1,
    type: TokenType.Erc1155
  }
  const erc1155Item: Erc1155Item = {
    token: {
      contract: erc1155Nft.collection.contract,
      animationUrl: 'https://animation.url/',
      collection: dissoc('contract', erc1155Nft.collection),
      tokenIdLabel: '#0001',
      name: 'Spiral Frequencies #1',
      metadataUrl: 'https://metadata.url/',
      pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/bc7e85d32d9391374695bc88926b532b',
      tokenId: 1,
      type: TokenType.Erc1155
    },
    quantity: 2
  }
  const erc20Item: Erc20Item = {
    quantity: 10,
    token: {
      decimals: 6,
      type: TokenType.Erc20,
      contract: {
        address: '0xaddress',
        chain: 'ethereum'
      },
      name: 'erc20'
    }
  }
  test('only returns the erc721 items from an item list', () => {
    const erc721Item2: Erc721Item = assocPath(['token', 'tokenId'], 2, erc721Item)
    const erc721Item3: Erc721Item = assocPath(['token', 'tokenId'], 3, erc721Item)
    const erc721Item4: Erc721Item = assocPath(['token', 'tokenId'], 4, erc721Item)
    const items = [
      erc721Item,
      erc1155Item,
      erc1155Item,
      erc721Item2,
      erc721Item3,
      erc20Item,
      erc1155Item,
      erc721Item4,
      erc20Item
    ]
    const filteredItems = erc721Items(items)
    expect(filteredItems.length).toBe(4)
    expect(filteredItems).toEqual([erc721Item, erc721Item2, erc721Item3, erc721Item4])
  })
  test('also works with duplicates', () => {
    const items = [
      erc721Item,
      erc1155Item,
      erc1155Item,
      erc721Item,
      erc721Item,
      erc20Item,
      erc1155Item,
      erc721Item,
      erc20Item
    ]
    const filteredItems = erc721Items(items)
    expect(filteredItems.length).toBe(4)
    expect(filteredItems).toEqual([erc721Item, erc721Item, erc721Item, erc721Item])
  })
})
