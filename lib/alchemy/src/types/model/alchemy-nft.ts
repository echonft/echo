import { type AlchemyNftAttribute } from '@echo/alchemy/types/model/alchemy-nft-attribute'
import type { HexString } from '@echo/utils/types/hex-string'

export interface AlchemyNft {
  contractAddress: Lowercase<HexString>
  chainId: number
  attributes: AlchemyNftAttribute[]
  balance: number
  name: string
  pictureUrl: string
  thumbnailUrl: string
  tokenId: number
  tokenType: 'ERC721' | 'ERC1155'
}
