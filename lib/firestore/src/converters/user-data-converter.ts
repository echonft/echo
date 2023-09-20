import { getSnapshotData } from '@echo/firestore/helpers/converters/from-firestore/get-snapshot-data'
import type { FirestoreModel } from '@echo/firestore/types/abstract/firestore-model'
import type { FirestoreUser } from '@echo/firestore/types/model/firestore-user'
import type { UserDocumentData } from '@echo/firestore/types/model/user-document-data'
import { modifyDatePropToNumber } from '@echo/utils/fp/modify-date-prop-to-number'
import { modifyNumberPropToDate } from '@echo/utils/fp/modify-number-prop-to-date'
import type { FirestoreDataConverter, QueryDocumentSnapshot, SetOptions } from 'firebase-admin/lib/firestore'
import { pipe } from 'ramda'

export const userDataConverter: FirestoreDataConverter<Partial<FirestoreUser>> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<UserDocumentData>) {
    return pipe(getSnapshotData<UserDocumentData>, modifyNumberPropToDate('updatedAt'))(snapshot)
  },
  toFirestore(modelObject: FirestoreModel<FirestoreUser>, _options?: SetOptions): UserDocumentData {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return modifyDatePropToNumber('updatedAt', modelObject)
  }
}
