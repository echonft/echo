import { swapDocumentDataConverter } from '@echo/firestore/converters/swap/swap-document-data-converter'
import { getSnapshotData } from '@echo/firestore/helpers/converters/from-firestore/get-snapshot-data'
import type { FirestoreSwap } from '@echo/firestore/types/model/swap/firestore-swap'
import type { SwapDocumentData } from '@echo/firestore/types/model/swap/swap-document-data'
import type { FirestoreDataConverter, QueryDocumentSnapshot } from 'firebase-admin/lib/firestore'
import { PartialWithFieldValue } from 'firebase-admin/lib/firestore'
import { pipe } from 'ramda'

export const swapDataConverter: FirestoreDataConverter<FirestoreSwap> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<SwapDocumentData>) {
    return pipe(getSnapshotData<SwapDocumentData>, swapDocumentDataConverter.fromFirestore)(snapshot)
  },
  toFirestore(modelObject: PartialWithFieldValue<FirestoreSwap>): SwapDocumentData {
    return swapDocumentDataConverter.toFirestore(modelObject)
  }
}
