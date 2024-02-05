import type { Nullable } from '@echo/utils/types/nullable'

export interface AlchemyContractResponse {
  address: string
  name: string
  symbol: string
  totalSupply: string
  tokenType: string
  contractDeployer: string
  deployedBlockNumber: number
  openSeaMetadata: OpenSeaMetadata
  isSpam?: boolean
  spamClassifications?: string[]
}

interface OpenSeaMetadata {
  floorPrice: number
  collectionName: string
  safelistRequestStatus: string
  imageUrl: string
  description: Nullable<string>
  externalUrl: Nullable<string>
  twitterUsername: Nullable<string>
  discordUrl: Nullable<string>
  lastIngestedAt: string
}
