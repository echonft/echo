import { TokenType } from '@echo/model/constants/token-type'
import { erc1155TokenToNft } from '@echo/model/mappers/nft/erc1155-token-to-nft'
import { nftCollection } from '@echo/model/mappers/nft/nft-collection'
import { collectionMockSpiralId } from '@echo/model/mocks/collection/collection-mock'
import { getCollectionMockById } from '@echo/model/mocks/collection/get-collection-mock-by-id'
import { getUserMockByUsername, userMockJohnnyUsername } from '@echo/model/mocks/user/user-mock'
import type { OwnedErc1155Nft } from '@echo/model/types/nft/owned-erc1155-nft'
import type { Erc1155Token } from '@echo/model/types/token/erc1155-token'
import { describe, expect, test } from '@jest/globals'
import { dissoc, pipe } from 'ramda'

describe('mappers - nft - erc1155TokenToNft', () => {
  const nft: Omit<OwnedErc1155Nft, 'attributes'> = {
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
    expect(erc1155TokenToNft(nft.owner)(token)).toStrictEqual(nft)
  })
})
