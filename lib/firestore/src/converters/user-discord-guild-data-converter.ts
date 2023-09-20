import { getSnapshotData } from '@echo/firestore/helpers/converters/from-firestore/get-snapshot-data'
import type { FirestoreModel } from '@echo/firestore/types/abstract/firestore-model'
import { FirestoreUserDiscordGuild } from '@echo/firestore/types/model/firestore-user-discord-guild'
import { UserDiscordGuildDocumentData } from '@echo/firestore/types/model/user-discord-guild-document-data'
import { modifyDatePropToNumber } from '@echo/utils/fp/modify-date-prop-to-number'
import { modifyNumberPropToDate } from '@echo/utils/fp/modify-number-prop-to-date'
import type { FirestoreDataConverter, QueryDocumentSnapshot, SetOptions } from 'firebase-admin/lib/firestore'
import { pipe } from 'ramda'

export const userDiscordGuildDataConverter: FirestoreDataConverter<Partial<FirestoreUserDiscordGuild>> = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  fromFirestore(snapshot: QueryDocumentSnapshot<UserDiscordGuildDocumentData>) {
    return pipe(getSnapshotData<UserDiscordGuildDocumentData>, modifyNumberPropToDate('updatedAt'))(snapshot)
  },
  toFirestore(
    modelObject: FirestoreModel<FirestoreUserDiscordGuild>,
    _options?: SetOptions
  ): UserDiscordGuildDocumentData {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return modifyDatePropToNumber('updatedAt', modelObject)
  }
}
