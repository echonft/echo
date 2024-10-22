import { TokenType } from '@echo/model/constants/token-type'
import { toNftCollection } from '@echo/model/mappers/collection/to-nft-collection'
import { erc1155NftToToken } from '@echo/model/mappers/nft/erc1155-nft-to-token'
import { collectionMockSpiralId } from '@echo/model/mocks/collection/collection-mock'
import { getCollectionMockById } from '@echo/model/mocks/collection/get-collection-mock-by-id'
import { getUserMockByUsername, userMockJohnnyUsername } from '@echo/model/mocks/user/user-mock'
import type { Erc1155Nft } from '@echo/model/types/nft/erc1155-nft'
import type { Erc1155Token } from '@echo/model/types/token/erc1155-token'
import { describe, expect, test } from '@jest/globals'
import { dissoc, pipe } from 'ramda'

describe('mappers - nft - erc1155NftToToken', () => {
  const nft: Erc1155Nft = {
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
    collection: pipe(collectionMockSpiralId, getCollectionMockById, toNftCollection)(),
    tokenIdLabel: '#0001',
    name: 'Spiral Frequencies #1',
    owner: pipe(userMockJohnnyUsername, getUserMockByUsername)(),
    metadataUrl: 'https://metadata.url/',
    pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/bc7e85d32d9391374695bc88926b532b',
    tokenId: 1,
    type: TokenType.Erc1155
  }
  const token: Erc1155Token = {
    contract: nft.collection.contract,
    animationUrl: 'https://animation.url/',
    collection: dissoc('contract', nft.collection),
    tokenIdLabel: '#0001',
    name: 'Spiral Frequencies #1',
    metadataUrl: 'https://metadata.url/',
    pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/bc7e85d32d9391374695bc88926b532b',
    tokenId: 1,
    type: TokenType.Erc1155
  }
  test('maps correctly', () => {
    expect(erc1155NftToToken(nft)).toStrictEqual(token)
  })
})
