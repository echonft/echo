import { collectionMockSpiralId } from '@echo/firestore/mocks/db-model/collection-document-data-mock'
import { TokenType } from '@echo/model/constants/token-type'
import { toNftCollection } from '@echo/model/mappers/collection/to-nft-collection'
import { erc721NftToToken } from '@echo/model/mappers/nft/erc721-nft-to-token'
import { getCollectionMockById } from '@echo/model/mocks/collection/get-collection-mock-by-id'
import { getUserMockByUsername, userMockJohnnyUsername } from '@echo/model/mocks/user-mock'
import type { Erc721Nft } from '@echo/model/types/erc721-nft'
import type { Erc721Token } from '@echo/model/types/erc721-token'
import { describe, expect, test } from '@jest/globals'
import { dissoc, pipe } from 'ramda'

describe('mappers - nft - erc721NftToToken', () => {
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
    collection: pipe(collectionMockSpiralId, getCollectionMockById, toNftCollection)(),
    name: 'Spiral Frequencies #1',
    owner: pipe(userMockJohnnyUsername, getUserMockByUsername)(),
    pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/bc7e85d32d9391374695bc88926b532b',
    tokenId: 1,
    type: TokenType.Erc721
  }
  const token: Erc721Token = {
    contract: nft.collection.contract,
    collection: dissoc('contract', nft.collection),
    name: 'Spiral Frequencies #1',
    pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/bc7e85d32d9391374695bc88926b532b',
    tokenId: 1,
    type: TokenType.Erc721
  }
  test('maps correctly', () => {
    expect(erc721NftToToken(nft)).toStrictEqual(token)
  })
})
