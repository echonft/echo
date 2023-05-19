import { getDocRefFromPath } from '../../utils/document/get-doc-ref-from-path'
import { CollectionName, FirestoreNft } from '@echo/firestore'
import { DocumentReference } from '@google-cloud/firestore'

export const getFirestoreNftRefById = (id: string): DocumentReference<FirestoreNft> =>
  getDocRefFromPath(CollectionName.NFTS, id)
