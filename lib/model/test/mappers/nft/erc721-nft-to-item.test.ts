import { TokenType } from '@echo/model/constants/token-type'
import { erc721NftToItem } from '@echo/model/mappers/nft/erc721-nft-to-item'
import { nftCollection } from '@echo/model/mappers/nft/nft-collection'
import { collectionMockSpiralId } from '@echo/model/mocks/collection/collection-mock'
import { getCollectionMockById } from '@echo/model/mocks/collection/get-collection-mock-by-id'
import { getUserMockByUsername, userMockJohnnyUsername } from '@echo/model/mocks/user/user-mock'
import type { Erc721Item } from '@echo/model/types/item/erc721-item'
import type { Erc721Nft } from '@echo/model/types/nft/erc721-nft'
import { describe, expect, test } from '@jest/globals'
import { dissoc, pipe } from 'ramda'

describe('mappers - nft - erc721NftToItem', () => {
  const nft: Erc721Nft = {
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
  const item: Erc721Item = {
    token: {
      contract: nft.collection.contract,
      animationUrl: 'https://animation.url/',
      collection: dissoc('contract', nft.collection),
      tokenIdLabel: '#0001',
      name: 'Spiral Frequencies #1',
      metadataUrl: 'https://metadata.url/',
      pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/bc7e85d32d9391374695bc88926b532b',
      tokenId: 1,
      type: TokenType.Erc721
    }
  }
  test('maps correctly', () => {
    expect(erc721NftToItem(nft)).toStrictEqual(item)
  })
})
