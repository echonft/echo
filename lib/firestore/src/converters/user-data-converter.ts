import { getSnapshotData } from '../helpers/converters/from-firestore/get-snapshot-data'
import { numberPropToDate } from '../helpers/converters/from-firestore/number-prop-to-date'
import { datePropToNumber } from '../helpers/converters/to-firestore/date-prop-to-number'
import { removeUndefinedProps } from '../helpers/converters/to-firestore/remove-undefined-props'
import { FirestoreModel } from '../types/abstract/firestore-model'
import { User } from '../types/model/user'
import { UserDocumentData } from '../types/model/user-document-data'
import { FirestoreDataConverter, QueryDocumentSnapshot, SetOptions } from 'firebase-admin/firestore'
import { applySpec, pipe, prop } from 'ramda'

export const userDataConverter: FirestoreDataConverter<User> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<UserDocumentData>): User {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return pipe(
      getSnapshotData<UserDocumentData>,
      applySpec<User>({
        id: prop('id'),
        discordAvatar: prop('discordAvatar'),
        discordBanner: prop('discordBanner'),
        discordGuilds: prop('discordGuilds'),
        discordId: prop('discordId'),
        discordUsername: prop('discordUsername'),
        nonce: prop('nonce'),
        updatedAt: numberPropToDate('updatedAt'),
        wallets: prop('wallets')
      })
    )(snapshot)
  },
  toFirestore(modelObject: FirestoreModel<User>, _options?: SetOptions): UserDocumentData {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return pipe(removeUndefinedProps, datePropToNumber('updatedAt'))(modelObject)
  }
}
