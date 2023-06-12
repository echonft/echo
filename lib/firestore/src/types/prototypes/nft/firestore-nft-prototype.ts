import { FirestoreNftAttribute } from '../../model/collections/nft/firestore-nft-attribute'
import { FirestorePrototypeData } from '../base/firestore-prototype-data'

export interface FirestoreNftPrototype extends FirestorePrototypeData {
  attributes: FirestoreNftAttribute[]
  balance?: number
  collectionId: string
  description?: string
  name?: string
  ownerId?: string
  pictureUrl: string
  thumbnailUrl: string
  tokenId: number
  tokenType: string
}
