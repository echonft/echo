import { getDocRefFromPath } from '../../utils/document/get-doc-ref-from-path'
import { CollectionName, FirestoreNftCollection } from '@echo/firestore'
import { DocumentReference } from '@google-cloud/firestore'

export const getFirestoreNftCollectionRefById = (id: string): DocumentReference<FirestoreNftCollection> =>
  getDocRefFromPath(CollectionName.NFT_COLLECTIONS, id)
