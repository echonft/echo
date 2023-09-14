import type { AlchemyNftAttribute } from '@echo/alchemy/types/model/alchemy-nft-attribute'

export type AlchemyNft = {
  contractAddress: string
  chainId: number
  attributes: AlchemyNftAttribute[]
  balance: number
  name: string
  pictureUrl: string
  thumbnailUrl: string
  tokenId: number
  tokenType: 'ERC721' | 'ERC1155'
}
