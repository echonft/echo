import { TokenType } from '@echo/model/constants/token-type'
import { toNftCollection } from '@echo/model/mappers/collection/to-nft-collection'
import { erc1155TokenToNft } from '@echo/model/mappers/token/erc1155-token-to-nft'
import { getCollectionMockById } from '@echo/model/mocks/collection/get-collection-mock-by-id'
import { getUserMockByUsername, userMockJohnnyUsername } from '@echo/model/mocks/user-mock'
import type { Erc1155Token } from '@echo/model/types/erc1155-token'
import type { OwnedErc1155Nft } from '@echo/model/types/owned-erc1155-nft'
import { describe, expect, test } from '@jest/globals'
import { dissoc, pipe } from 'ramda'

describe('mappers - token - erc1155TokenToNft', () => {
  const nft: Omit<OwnedErc1155Nft, 'attributes'> = {
    collection: pipe(collectionMockSpiralId, getCollectionMockById, toNftCollection)(),
    name: 'Spiral Frequencies #1',
    owner: pipe(userMockJohnnyUsername, getUserMockByUsername)(),
    pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/bc7e85d32d9391374695bc88926b532b',
    tokenId: 1,
    type: TokenType.Erc1155
  }
  const token: Erc1155Token = {
    contract: nft.collection.contract,
    collection: dissoc('contract', nft.collection),
    name: 'Spiral Frequencies #1',
    pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/bc7e85d32d9391374695bc88926b532b',
    tokenId: 1,
    type: TokenType.Erc1155
  }
  test('maps correctly', () => {
    expect(erc1155TokenToNft(nft.owner)(token)).toStrictEqual(nft)
  })
})
