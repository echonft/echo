import { CollectionName } from '../../config/collection-name'
import { FirestoreNftCollection } from '../../types/model/collections/nft-collection/firestore-nft-collection'
import { getDocRefFromPath } from '../../utils/document/get-doc-ref-from-path'
import { DocumentReference } from '@google-cloud/firestore'

export const getFirestoreNftCollectionRefById = (id: string): DocumentReference<FirestoreNftCollection> =>
  getDocRefFromPath(CollectionName.NFT_COLLECTIONS, id)
