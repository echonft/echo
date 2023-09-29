import { getSnapshotData } from '@echo/firestore/helpers/converters/from-firestore/get-snapshot-data'
import type { FirestoreUser } from '@echo/firestore/types/model/user/firestore-user'
import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import { modifyDatePropToNumber } from '@echo/utils/fp/modify-date-prop-to-number'
import { modifyNumberPropToDate } from '@echo/utils/fp/modify-number-prop-to-date'
import type { FirestoreDataConverter, QueryDocumentSnapshot } from 'firebase-admin/lib/firestore'
import { PartialWithFieldValue } from 'firebase-admin/lib/firestore'
import { pipe } from 'ramda'

export const userDataConverter: FirestoreDataConverter<FirestoreUser> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<UserDocumentData>) {
    return pipe(getSnapshotData<UserDocumentData>, modifyNumberPropToDate('updatedAt'))(snapshot)
  },
  toFirestore(modelObject: PartialWithFieldValue<FirestoreUser>): UserDocumentData {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return modifyDatePropToNumber('updatedAt', modelObject)
  }
}
