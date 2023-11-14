import { getSnapshotData } from '@echo/firestore/helpers/converters/from-firestore/get-snapshot-data'
import { modifyWhenHas } from '@echo/firestore/helpers/converters/to-firestore/modify-when-has'
import type { Collection } from '@echo/model/types/collection'
import type { Contract } from '@echo/model/types/contract'
import {
  type FirestoreDataConverter,
  type PartialWithFieldValue,
  QueryDocumentSnapshot
} from 'firebase-admin/firestore'
import { modifyPath, partial, pipe, toLower } from 'ramda'

type PartialCollection = Collection | (PartialWithFieldValue<Collection> & Record<'contract', Contract>)
function modifyContract<T extends PartialCollection>(collection: T) {
  return partial(modifyPath, [['contract', 'address'], toLower])(collection) as T
}

export const collectionDataConverter: FirestoreDataConverter<Collection> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<Collection>) {
    return pipe(getSnapshotData<Collection>, modifyContract)(snapshot)
  },
  toFirestore(modelObject: PartialWithFieldValue<Collection>) {
    return modifyWhenHas<Collection, 'contract', Contract>(modifyContract)(modelObject)
  }
}
