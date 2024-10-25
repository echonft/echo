import { TokenType } from '@echo/model/constants/token-type'
import { collectionMockSpiral, nftCollectionMockPx, nftCollectionMockSpiral } from '@echo/model/mocks/collection-mock'
import type { Erc1155Token } from '@echo/model/types/erc1155-token'
import type { Erc721Token } from '@echo/model/types/erc721-token'

export const erc721TokenMock: Erc721Token = {
  contract: collectionMockSpiral.contract,
  collection: nftCollectionMockSpiral,
  name: 'Spiral Frequencies #1',
  pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/bc7e85d32d9391374695bc88926b532b',
  tokenId: 1,
  type: TokenType.Erc721
}

export const erc1155TokenMock: Erc1155Token = {
  contract: nftCollectionMockPx.contract,
  collection: nftCollectionMockPx,
  name: 'Creative Demigod #1',
  pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/c96b4f27dc8dec8a869932f36205bafa',
  tokenId: 1,
  type: TokenType.Erc1155
}
