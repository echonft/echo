import { getSnapshotData } from '../helpers/converters/from-firestore/get-snapshot-data'
import { FirestoreModel } from '../types/abstract/firestore-model'
import { Swap } from '../types/model/swap'
import { SwapDocumentData } from '../types/model/swap-document-data'
import { swapDocumentDataConverter } from './swap-document-data-converter'
import { FirestoreDataConverter, QueryDocumentSnapshot, SetOptions } from 'firebase-admin/lib/firestore'
import { pipe } from 'ramda'

export const swapDataConverter: FirestoreDataConverter<Swap> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<SwapDocumentData>): Swap {
    return pipe(getSnapshotData<SwapDocumentData>, swapDocumentDataConverter.fromFirestore)(snapshot)
  },
  toFirestore(modelObject: FirestoreModel<Swap>, _options?: SetOptions): SwapDocumentData {
    return swapDocumentDataConverter.toFirestore(modelObject)
  }
}
