import { FirestoreNftPrototype } from '@echo/firestore'

export interface GetNftResponse extends Omit<FirestoreNftPrototype, 'collectionId' | 'ownerId'> {
  contractAddress: string
}
