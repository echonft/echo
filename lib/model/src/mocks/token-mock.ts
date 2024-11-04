import { TokenType } from '@echo/model/constants/token-type'
import { erc1155NftMock, nftMockSpiral1 } from '@echo/model/mocks/nft-mock'
import type { Erc1155Token, Erc20Token, Erc721Token } from '@echo/model/types/token'

export const erc721TokenMock: Erc721Token = {
  contract: nftMockSpiral1.collection.contract,
  collection: {
    name: nftMockSpiral1.collection.name,
    slug: nftMockSpiral1.collection.slug,
    totalSupply: nftMockSpiral1.collection.totalSupply
  },
  name: nftMockSpiral1.name,
  pictureUrl: nftMockSpiral1.pictureUrl,
  tokenId: nftMockSpiral1.tokenId,
  type: TokenType.Erc721
}

export const erc1155TokenMock: Erc1155Token = {
  contract: erc1155NftMock.collection.contract,
  collection: {
    name: erc1155NftMock.collection.name,
    slug: erc1155NftMock.collection.slug,
    totalSupply: erc1155NftMock.collection.totalSupply
  },
  name: erc1155NftMock.name,
  pictureUrl: erc1155NftMock.pictureUrl,
  tokenId: erc1155NftMock.tokenId,
  type: TokenType.Erc1155
}

export const erc20TokenMock: Erc20Token = {
  contract: '0xb75d0b03c06a926e488e2659df1a861f860bd3d1',
  decimals: 18,
  name: 'USDT',
  type: TokenType.Erc20
}
