import type { AlchemyContractResponse } from '@echo/alchemy/types/response/alchemy-contract-response'

export interface AlchemyNftResponse {
  contract: AlchemyContractResponse
  tokenId: string
  tokenType: string
  name: string
  description?: string
  image: Image
  raw: Raw
  tokenUri: string
  timeLastUpdated: string
  balance?: string
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
  image: string
  attributes: Attribute[]
}

export interface Attribute {
  value: string
  trait_type: string
}
