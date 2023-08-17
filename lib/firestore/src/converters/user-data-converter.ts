import { datePropToNumber } from '../helpers/converters/date-prop-to-number'
import { documentDataArrayPropToModelArray } from '../helpers/converters/document-data-array-prop-to-model-array'
import { getSnapshotData } from '../helpers/converters/get-snapshot-data'
import { modelArrayPropToDocumentDataArray } from '../helpers/converters/model-array-prop-to-document-data-array'
import { numberPropToDate } from '../helpers/converters/number-prop-to-date'
import { FirestoreModel } from '../types/abstract/firestore-model'
import { User } from '../types/model/user'
import { UserDocumentData } from '../types/model/user-document-data'
import { walletDocumentDataConverter } from './wallet-document-data-converter'
import { FirestoreDataConverter, QueryDocumentSnapshot, SetOptions } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export const userDataConverter: FirestoreDataConverter<User> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<UserDocumentData>): User {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return pipe(
      getSnapshotData<UserDocumentData>,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      numberPropToDate('updatedAt'),
      documentDataArrayPropToModelArray('wallets', walletDocumentDataConverter)
    )(snapshot)
  },
  toFirestore(modelObject: FirestoreModel<User>, _options?: SetOptions): UserDocumentData {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return pipe(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      datePropToNumber('updatedAt'),
      modelArrayPropToDocumentDataArray('wallets', walletDocumentDataConverter)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
    )(modelObject)
  }
}
