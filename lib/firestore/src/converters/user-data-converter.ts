import { datePropToNumber } from '../helpers/converters/date-prop-to-number'
import { getSnapshotData } from '../helpers/converters/get-snapshot-data'
import { numberPropToDate } from '../helpers/converters/number-prop-to-date'
import { FirestoreModel } from '../types/abstract/firestore-model'
import { User } from '../types/model/user'
import { UserDocumentData } from '../types/model/user-document-data'
import { FirestoreDataConverter, QueryDocumentSnapshot, SetOptions } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export const userDataConverter: FirestoreDataConverter<User> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<UserDocumentData>): User {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return pipe(getSnapshotData<UserDocumentData>, numberPropToDate('updatedAt'))(snapshot)
  },
  toFirestore(modelObject: FirestoreModel<User>, _options?: SetOptions): UserDocumentData {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return pipe(
      datePropToNumber('updatedAt')
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
    )(modelObject)
  }
}
