import { getDocRefFromPath } from '../../utils/document/get-doc-ref-from-path'
import { CollectionName, FirestoreContract } from '@echo/firestore'
import { DocumentReference } from '@google-cloud/firestore'

export const getFirestoreContractRefById = (id: string): DocumentReference<FirestoreContract> =>
  getDocRefFromPath(CollectionName.CONTRACTS, id)
