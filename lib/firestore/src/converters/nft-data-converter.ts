import { getSnapshotData } from '../helpers/converters/from-firestore/get-snapshot-data'
import { FirestoreModel } from '../types/abstract/firestore-model'
import { NftDocumentData } from '../types/model/nft-document-data'
import { nftDocumentDataConverter } from './nft-document-data-converter'
import { Nft } from '@echo/firestore-types'
import { FirestoreDataConverter, QueryDocumentSnapshot, SetOptions } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export const nftDataConverter: FirestoreDataConverter<Partial<Nft>> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<NftDocumentData>): Nft {
    return pipe(getSnapshotData<NftDocumentData>, nftDocumentDataConverter.fromFirestore)(snapshot)
  },
  toFirestore(modelObject: FirestoreModel<Nft>, _options?: SetOptions): NftDocumentData {
    return nftDocumentDataConverter.toFirestore(modelObject)
  }
}
