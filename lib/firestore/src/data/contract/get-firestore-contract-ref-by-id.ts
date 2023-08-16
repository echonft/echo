import { CollectionName } from '../../constants/collection-name'
import { getDocRefFromPath } from '../../helpers/document/get-doc-ref-from-path'
import { FirestoreContract } from '../../types/model/collections/contract/firestore-contract'
import { DocumentReference } from 'firebase-admin/firestore'

export const getFirestoreContractRefById = (id: string): DocumentReference<FirestoreContract> =>
  getDocRefFromPath(CollectionName.CONTRACTS, id)
