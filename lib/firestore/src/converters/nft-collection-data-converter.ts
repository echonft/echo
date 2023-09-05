import { getSnapshotData } from '../helpers/converters/from-firestore/get-snapshot-data'
import { FirestoreModel } from '../types/abstract/firestore-model'
import { NftCollectionDocumentData } from '../types/model/nft-collection-document-data'
import { nftCollectionDocumentDataConverter } from './nft-collection-document-data-converter'
import { NftCollection } from '@echo/firestore-types'
import { FirestoreDataConverter, QueryDocumentSnapshot, SetOptions } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export const nftCollectionDataConverter: FirestoreDataConverter<Partial<NftCollection>> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<NftCollectionDocumentData>) {
    return pipe(getSnapshotData<NftCollectionDocumentData>, nftCollectionDocumentDataConverter.fromFirestore)(snapshot)
  },
  toFirestore(modelObject: FirestoreModel<NftCollection>, _options?: SetOptions): NftCollectionDocumentData {
    return nftCollectionDocumentDataConverter.toFirestore(modelObject)
  }
}
