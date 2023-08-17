import { getSnapshotData } from '../helpers/converters/get-snapshot-data'
import { Nft } from '../types/model/nft'
import { NftDocumentData } from '../types/model/nft-document-data'
import { nftDocumentDataConverter } from './nft-document-data-converter'
import {
  FirestoreDataConverter,
  PartialWithFieldValue,
  QueryDocumentSnapshot,
  SetOptions,
  WithFieldValue
} from 'firebase-admin/lib/firestore'
import { pipe } from 'ramda'

export const nftDataConverter: FirestoreDataConverter<Nft> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<NftDocumentData>): Nft {
    return pipe(getSnapshotData<NftDocumentData>, nftDocumentDataConverter.fromFirestore)(snapshot)
  },
  toFirestore(modelObject: PartialWithFieldValue<Nft> | WithFieldValue<Nft>, _options?: SetOptions): NftDocumentData {
    return nftDocumentDataConverter.toFirestore(modelObject)
  }
}
