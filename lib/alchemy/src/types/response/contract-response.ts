import type { TokenType } from '@echo/model/types/token-type'
import type { HexString } from '@echo/utils/types/hex-string'
import type { Nullable } from '@echo/utils/types/nullable'

export interface ContractResponse {
  address: HexString
  name: string
  symbol: string
  totalSupply: string
  tokenType: Extract<TokenType, 'ERC721' | 'ERC1155'>
  contractDeployer: string
  deployedBlockNumber: number
  openSeaMetadata: OpenSeaMetadata
  isSpam?: boolean
  spamClassifications?: string[]
}

interface OpenSeaMetadata {
  floorPrice: number
  collectionName: string
  collectionSlug: string
  safelistRequestStatus: string
  imageUrl: string
  description: Nullable<string>
  externalUrl: Nullable<string>
  twitterUsername: Nullable<string>
  discordUrl: Nullable<string>
  bannerImageUrl: Nullable<string>
  lastIngestedAt: string
}
