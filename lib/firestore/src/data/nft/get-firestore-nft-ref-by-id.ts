import { CollectionName } from '../../constants/collection-name'
import { getDocRefFromPath } from '../../helpers/document/get-doc-ref-from-path'
import { FirestoreNft } from '../../types/model/collections/nft/firestore-nft'
import { DocumentReference } from 'firebase-admin/firestore'

export const getFirestoreNftRefById = (id: string): DocumentReference<FirestoreNft> =>
  getDocRefFromPath(CollectionName.NFTS, id)
