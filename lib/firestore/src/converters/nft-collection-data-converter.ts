import { getSnapshotData } from '../helpers/converters/get-snapshot-data'
import { NftCollection } from '../types/model/nft-collection'
import { NftCollectionDocumentData } from '../types/model/nft-collection-document-data'
import { nftCollectionDocumentDataConverter } from './nft-collection-document-data-converter'
import {
  FirestoreDataConverter,
  PartialWithFieldValue,
  QueryDocumentSnapshot,
  SetOptions,
  WithFieldValue
} from 'firebase-admin/lib/firestore'
import { pipe } from 'ramda'

export const nftCollectionDataConverter: FirestoreDataConverter<NftCollection> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<NftCollectionDocumentData>): NftCollection {
    return pipe(getSnapshotData<NftCollectionDocumentData>, nftCollectionDocumentDataConverter.fromFirestore)(snapshot)
  },
  toFirestore(
    modelObject: PartialWithFieldValue<NftCollection> | WithFieldValue<NftCollection>,
    _options?: SetOptions
  ): NftCollectionDocumentData {
    return nftCollectionDocumentDataConverter.toFirestore(modelObject)
  }
}
