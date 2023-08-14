import { CollectionName } from '../../config/collection-name'
import { FirestoreNft } from '../../types/model/collections/nft/firestore-nft'
import { getDocRefFromPath } from '../../utils/document/get-doc-ref-from-path'
import { DocumentReference } from '@google-cloud/firestore'

export const getFirestoreNftRefById = (id: string): DocumentReference<FirestoreNft> =>
  getDocRefFromPath(CollectionName.NFTS, id)
