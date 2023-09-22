import { getSnapshotData } from '@echo/firestore/helpers/converters/from-firestore/get-snapshot-data'
import type { FirestoreModel } from '@echo/firestore/types/abstract/firestore-model'
import type { DiscordUserDocumentData } from '@echo/firestore/types/model/discord-user/discord-user-document-data'
import type { FirestoreDiscordUser } from '@echo/firestore/types/model/discord-user/firestore-discord-user'
import { modifyDatePropToNumber } from '@echo/utils/fp/modify-date-prop-to-number'
import { modifyNumberPropToDate } from '@echo/utils/fp/modify-number-prop-to-date'
import type { FirestoreDataConverter, QueryDocumentSnapshot, SetOptions } from 'firebase-admin/lib/firestore'
import { pipe } from 'ramda'

export const discordUserDataConverter: FirestoreDataConverter<Partial<FirestoreDiscordUser>> = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  fromFirestore(snapshot: QueryDocumentSnapshot<DiscordUserDocumentData>) {
    return pipe(getSnapshotData<DiscordUserDocumentData>, modifyNumberPropToDate('updatedAt'))(snapshot)
  },
  toFirestore(modelObject: FirestoreModel<FirestoreDiscordUser>, _options?: SetOptions): DiscordUserDocumentData {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return modifyDatePropToNumber('updatedAt', modelObject)
  }
}
