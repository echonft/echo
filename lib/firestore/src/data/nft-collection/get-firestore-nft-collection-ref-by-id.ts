import { CollectionName } from '../../constants/collection-name'
import { getDocRefFromPath } from '../../helpers/document/get-doc-ref-from-path'
import { FirestoreNftCollection } from '../../types/model/collections/nft-collection/firestore-nft-collection'
import { DocumentReference } from 'firebase-admin/firestore'

export const getFirestoreNftCollectionRefById = (id: string): DocumentReference<FirestoreNftCollection> =>
  getDocRefFromPath(CollectionName.NFT_COLLECTIONS, id)
