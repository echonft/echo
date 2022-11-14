import { TokenType } from '@echo/model/src/erc721'

export enum SafelistRequestStatus {
  NOT_REQUESTED = 'not_requested',
  REQUESTED = 'requested',
  APPROVED = 'approved',
  VERIFIED = 'verified'
}

interface OpenSeaMetadata {
  floorPrice: number | undefined
  collectionName: string | undefined
  safelistRequestStatus: SafelistRequestStatus | undefined
  imageUrl: string | undefined
  description: string | undefined
  externalUrl: string | undefined
  twitterUsername: string | undefined
  discordUrl: string | undefined
}

interface SpamInfo {
  isSpam: boolean
  classifications: string[]
}

export interface ContractMetadata {
  name: string
  symbol: string
  totalSupply: number
  tokenType: TokenType
  opensea: OpenSeaMetadata | undefined
  spamInfo: SpamInfo | undefined
}
