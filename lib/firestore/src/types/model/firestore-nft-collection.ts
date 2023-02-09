import { FirestoreContract } from './firestore-contract'
import { DocumentData, DocumentReference } from 'firebase/firestore'

export interface FirestoreNftCollection extends DocumentData {
  contract: DocumentReference<FirestoreContract>
  tokenType: string
  name: string | undefined
  symbol: string | undefined
  totalSupply: number | undefined
  openSea: {
    /** The floor price of the NFT. */
    floorPrice: number | undefined
    /** The name of the collection on OpenSea. */
    collectionName: string | undefined
    /** The approval status of the collection on OpenSea. */
    safelistRequestStatus: string | undefined
    /** The image URL determined by OpenSea. */
    imageUrl: string | undefined
    /** The description of the collection on OpenSea. */
    description: string | undefined
    /** The homepage of the collection as determined by OpenSea. */
    externalUrl: string | undefined
    /** The Twitter handle of the collection. */
    twitterUsername: string | undefined
    /** The Discord URL of the collection. */
    discordUrl: string | undefined
    /** Timestamp of when the OpenSea metadata was last ingested by Alchemy. */
    lastIngestedAt: number | undefined
  }
}
