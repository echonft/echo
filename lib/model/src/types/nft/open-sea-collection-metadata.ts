import { OpenSeaSafelistRequestStatus } from './open-sea-safelist-request-status'
import { Dayjs } from 'dayjs'

export interface OpenSeaCollectionMetadata {
  /** The floor price of the NFT. */
  floorPrice: number | undefined
  /** The name of the collection on OpenSea. */
  collectionName: string | undefined
  /** The approval status of the collection on OpenSea. */
  safelistRequestStatus: OpenSeaSafelistRequestStatus | undefined
  /** The image URL determined by OpenSea. */
  imageUrl: URL | undefined
  /** The description of the collection on OpenSea. */
  description: string | undefined
  /** The homepage of the collection as determined by OpenSea. */
  externalUrl: URL | undefined
  /** The Twitter handle of the collection. */
  twitterUsername: string | undefined
  /** The Discord URL of the collection. */
  discordUrl: URL | undefined
  /** Timestamp of when the OpenSea metadata was last ingested by Alchemy. */
  lastIngestedAt: Dayjs | undefined
}
