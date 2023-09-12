import { getSnapshotData } from '../helpers/converters/from-firestore/get-snapshot-data'
import { modifyDocumentDataArrayProp } from '../helpers/converters/from-firestore/modify-document-data-array-prop'
import { FirestoreModel } from '../types/abstract/firestore-model'
import { UserDocumentData } from '../types/model/user-document-data'
import { walletDocumentDataConverter } from './wallet-document-data-converter'
import { User } from '@echo/firestore-types'
import modifyDatePropToNumber from '@echo/utils/modify-date-prop-to-number'
import modifyNumberPropToDate from '@echo/utils/modify-number-prop-to-date'
import { FirestoreDataConverter, QueryDocumentSnapshot, SetOptions } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export const userDataConverter: FirestoreDataConverter<Partial<User>> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<UserDocumentData>) {
    return pipe(
      getSnapshotData<UserDocumentData>,
      modifyNumberPropToDate('nftsUpdatedAt'),
      modifyNumberPropToDate('updatedAt'),
      modifyDocumentDataArrayProp('wallets', walletDocumentDataConverter)
    )(snapshot)
  },
  toFirestore(modelObject: FirestoreModel<User>, _options?: SetOptions): UserDocumentData {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return pipe(modifyDatePropToNumber('nftsUpdatedAt'), modifyDatePropToNumber('updatedAt'))(modelObject)
  }
}
