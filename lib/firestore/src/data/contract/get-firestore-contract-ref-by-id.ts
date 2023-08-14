import { CollectionName } from '../../config/collection-name'
import { FirestoreContract } from '../../types/model/collections/contract/firestore-contract'
import { getDocRefFromPath } from '../../utils/document/get-doc-ref-from-path'
import { DocumentReference } from '@google-cloud/firestore'

export const getFirestoreContractRefById = (id: string): DocumentReference<FirestoreContract> =>
  getDocRefFromPath(CollectionName.CONTRACTS, id)
