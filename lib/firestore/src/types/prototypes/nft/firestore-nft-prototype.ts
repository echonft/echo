import { FirestoreNftAttribute } from '../../model/collections/nft/firestore-nft-attribute'

export interface FirestoreNftPrototype {
  attributes: FirestoreNftAttribute[]
  balance: number
  collectionId: string
  description?: string
  name?: string
  ownerId: string
  pictureUrl: string
  thumbnailUrl: string
  tokenId: number
  tokenType: string
}
