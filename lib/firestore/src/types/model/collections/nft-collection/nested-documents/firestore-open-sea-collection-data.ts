import { DocumentData } from 'firebase/firestore'

export interface FirestoreOpenSeaCollectionData extends DocumentData {
  /** The floor price of the NFT. */
  floorPrice?: number
  /** The name of the collection on OpenSea. */
  collectionName?: string
  /** The approval status of the collection on OpenSea. */
  safelistRequestStatus?: string
  /** The image URL determined by OpenSea. */
  imageUrl?: string
  /** The description of the collection on OpenSea. */
  description?: string
  /** The homepage of the collection as determined by OpenSea. */
  externalUrl?: string
  /** The Twitter handle of the collection. */
  twitterUsername?: string
  /** The Discord URL of the collection. */
  discordUrl?: string
  /** Timestamp of when the OpenSea metadata was last ingested by Alchemy. */
  lastIngestedAt?: number
}
