import { TokenType } from '@echo/model/constants/token-type'
import { toNftCollection } from '@echo/model/mappers/collection/to-nft-collection'
import { erc721TokenToNft } from '@echo/model/mappers/token/erc721-token-to-nft'
import { collectionMockSpiralId } from '@echo/model/mocks/collection/collection-mock'
import { getCollectionMockById } from '@echo/model/mocks/collection/get-collection-mock-by-id'
import { getUserMockByUsername, userMockJohnnyUsername } from '@echo/model/mocks/user/user-mock'
import type { OwnedErc721Nft } from '@echo/model/types/nft/owned-erc721-nft'
import type { Erc721Token } from '@echo/model/types/token/erc721-token'
import { describe, expect, test } from '@jest/globals'
import { dissoc, pipe } from 'ramda'

describe('mappers - token - erc721TokenToNft', () => {
  const nft: Omit<OwnedErc721Nft, 'attributes'> = {
    animationUrl: 'https://animation.url/',
    collection: pipe(collectionMockSpiralId, getCollectionMockById, toNftCollection)(),
    tokenIdLabel: '#0001',
    name: 'Spiral Frequencies #1',
    owner: pipe(userMockJohnnyUsername, getUserMockByUsername)(),
    metadataUrl: 'https://metadata.url/',
    pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/bc7e85d32d9391374695bc88926b532b',
    tokenId: 1,
    type: TokenType.Erc721
  }
  const token: Erc721Token = {
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
  test('maps correctly', () => {
    expect(erc721TokenToNft(nft.owner)(token)).toStrictEqual(nft)
  })
})
