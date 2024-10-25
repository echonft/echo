import { TokenType } from '@echo/model/constants/token-type'
import { toNftCollection } from '@echo/model/mappers/collection/to-nft-collection'
import { erc721TokenToNft } from '@echo/model/mappers/token/erc721-token-to-nft'
import { getCollectionMockById } from '@echo/model/mocks/collection/get-collection-mock-by-id'
import { getUserMockByUsername, userMockJohnnyUsername } from '@echo/model/mocks/user-mock'
import type { Erc721Token } from '@echo/model/types/erc721-token'
import type { OwnedErc721Nft } from '@echo/model/types/owned-erc721-nft'
import { describe, expect, test } from '@jest/globals'
import { dissoc, pipe } from 'ramda'

describe('mappers - token - erc721TokenToNft', () => {
  const nft: Omit<OwnedErc721Nft, 'attributes'> = {
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
    expect(erc721TokenToNft(nft.owner)(token)).toStrictEqual(nft)
  })
})
