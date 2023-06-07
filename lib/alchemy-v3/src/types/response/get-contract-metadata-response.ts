export interface GetContractMetadataResponse {
  address: string
  name: string
  symbol: string
  totalSupply: string
  tokenType: string
  contractDeployer: string
  deployedBlockNumber: number
  openSeaMetadata: OpenSeaMetadata
}

export interface OpenSeaMetadata {
  floorPrice: number
  collectionName: string
  safelistRequestStatus: string
  imageUrl: string
  description: string
  externalUrl: string
  twitterUsername: string
  discordUrl: string
  lastIngestedAt: string
}
