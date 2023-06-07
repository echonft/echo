export interface ContractResponse {
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
  description: string | undefined
  externalUrl: string | undefined
  twitterUsername: string | undefined
  discordUrl: string | undefined
  lastIngestedAt: string
}
