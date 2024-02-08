import type { HexString } from '@echo/utils/types/hex-string'

export interface NftMetadata {
  contractAddress: Lowercase<HexString>
  chainId: number
  attributes: {
    trait: string
    value: string
  }[]
  balance: number
  name: string
  pictureUrl: string
  thumbnailUrl: string
  tokenId: number
  tokenType: 'ERC721' | 'ERC1155'
}
