import { getSnapshotData } from '../helpers/converters/get-snapshot-data'
import { Swap } from '../types/model/swap'
import { SwapDocumentData } from '../types/model/swap-document-data'
import { swapDocumentDataConverter } from './swap-document-data-converter'
import {
  FirestoreDataConverter,
  PartialWithFieldValue,
  QueryDocumentSnapshot,
  SetOptions,
  WithFieldValue
} from 'firebase-admin/lib/firestore'
import { pipe } from 'ramda'

export const swapDataConverter: FirestoreDataConverter<Swap> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<SwapDocumentData>): Swap {
    return pipe(getSnapshotData<SwapDocumentData>, swapDocumentDataConverter.fromFirestore)(snapshot)
  },
  toFirestore(
    modelObject: PartialWithFieldValue<Swap> | WithFieldValue<Swap>,
    _options?: SetOptions
  ): SwapDocumentData {
    return swapDocumentDataConverter.toFirestore(modelObject)
  }
}
