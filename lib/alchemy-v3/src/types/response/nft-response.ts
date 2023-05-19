export interface NftResponse {
  contract: Contract
  tokenId: string
  tokenType: string
  name: string
  description: string
  image: Image
  raw: Raw
  tokenUri: string
  timeLastUpdated: string
  balance: string
}

interface Contract {
  address: string
  name: string
  symbol: string
  totalSupply: string
  tokenType: string
  contractDeployer: string
  deployedBlockNumber: number
  openSeaMetadata: OpenSeaMetadata
  isSpam: boolean
  spamClassifications: string[]
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

interface Image {
  cachedUrl: string
  thumbnailUrl: string
  pngUrl: string
  contentType: string
  size: number
  originalUrl: string
}

interface Raw {
  tokenUri: string
  metadata: Metadata
  error: string | undefined
}

interface Metadata {
  name: string
  description: string
  image: string
  attributes: Attribute[]
}

export interface Attribute {
  value: string
  trait_type: string
}
