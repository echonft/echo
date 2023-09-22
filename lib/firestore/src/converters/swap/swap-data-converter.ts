import { swapDocumentDataConverter } from '@echo/firestore/converters/swap/swap-document-data-converter'
import { getSnapshotData } from '@echo/firestore/helpers/converters/from-firestore/get-snapshot-data'
import type { FirestoreModel } from '@echo/firestore/types/abstract/firestore-model'
import type { FirestoreSwap } from '@echo/firestore/types/model/swap/firestore-swap'
import type { SwapDocumentData } from '@echo/firestore/types/model/swap/swap-document-data'
import type { FirestoreDataConverter, QueryDocumentSnapshot, SetOptions } from 'firebase-admin/lib/firestore'
import { pipe } from 'ramda'

export const swapDataConverter: FirestoreDataConverter<Partial<FirestoreSwap>> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<SwapDocumentData>) {
    return pipe(getSnapshotData<SwapDocumentData>, swapDocumentDataConverter.fromFirestore)(snapshot)
  },
  toFirestore(modelObject: FirestoreModel<FirestoreSwap>, _options?: SetOptions): SwapDocumentData {
    return swapDocumentDataConverter.toFirestore(modelObject)
  }
}
