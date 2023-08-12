import { FirestoreNftCollection } from '../nft-collection/firestore-nft-collection'
import { FirestoreUser } from '../user/firestore-user'
import { FirestoreNftAttribute } from './firestore-nft-attribute'
import { DocumentData, DocumentReference } from '@google-cloud/firestore'

export interface FirestoreNft extends DocumentData {
  attributes: FirestoreNftAttribute[]
  balance?: number
  collection: DocumentReference<FirestoreNftCollection>
  description?: string
  name?: string
  owner?: DocumentReference<FirestoreUser>
  pictureUrl: string
  thumbnailUrl: string
  tokenId: number
  tokenType: string
}
