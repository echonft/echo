import { getSnapshotData } from '../helpers/converters/from-firestore/get-snapshot-data'
import { modifyDocumentDataArrayProp } from '../helpers/converters/from-firestore/modify-document-data-array-prop'
import { FirestoreModel } from '../types/abstract/firestore-model'
import { User } from '../types/model/user'
import { UserDocumentData } from '../types/model/user-document-data'
import { walletDocumentDataConverter } from './wallet-document-data-converter'
import {
  assocUndefinedIfPropNotPresent,
  modifyDatePropToNumber,
  modifyNumberPropToDate,
  removeUndefinedProps
} from '@echo/utils'
import { FirestoreDataConverter, QueryDocumentSnapshot, SetOptions } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export const userDataConverter: FirestoreDataConverter<User> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<UserDocumentData>): User {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return pipe(
      getSnapshotData<UserDocumentData>,
      assocUndefinedIfPropNotPresent('discordAvatar'),
      assocUndefinedIfPropNotPresent('discordBanner'),
      assocUndefinedIfPropNotPresent('nonce'),
      modifyNumberPropToDate('nftsUpdatedAt'),
      modifyNumberPropToDate('updatedAt'),
      modifyDocumentDataArrayProp('wallets', walletDocumentDataConverter)
    )(snapshot)
  },
  toFirestore(modelObject: FirestoreModel<User>, _options?: SetOptions): UserDocumentData {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return pipe(
      removeUndefinedProps,
      modifyDatePropToNumber('nftsUpdatedAt'),
      modifyDatePropToNumber('updatedAt')
    )(modelObject)
  }
}
