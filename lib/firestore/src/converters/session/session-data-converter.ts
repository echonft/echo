import { getSnapshotData } from '@echo/firestore/helpers/converters/from-firestore/get-snapshot-data'
import { modifyTimestampPropToNumber } from '@echo/firestore/helpers/converters/from-firestore/modify-timestamp-prop-to-number'
import { modifyNumberPropToTimestamp } from '@echo/firestore/helpers/converters/to-firestore/modify-number-prop-to-timestamp'
import { type Session } from '@echo/firestore/types/model/session/session'
import { type SessionDocumentData } from '@echo/firestore/types/model/session/session-document-data'
import { propIsNotNil } from '@echo/utils/fp/prop-is-not-nil'
import { dateIsPast } from '@echo/utils/helpers/date-is-past'
import dayjs from 'dayjs'
import {
  type FirestoreDataConverter,
  type PartialWithFieldValue,
  type QueryDocumentSnapshot
} from 'firebase-admin/firestore'
import { assoc, dissoc, ifElse, isNil, lens, over, pipe, prop, when } from 'ramda'

export const sessionDataConverter: FirestoreDataConverter<Session> = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  fromFirestore(snapshot: QueryDocumentSnapshot<SessionDocumentData>) {
    return pipe(
      getSnapshotData<SessionDocumentData>,
      modifyTimestampPropToNumber('expires'),
      when(
        propIsNotNil('expires'),
        over(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          lens(prop('expires'), assoc('expired')),
          ifElse(
            isNil,
            () => {
              throw Error(`prop expires is undefined`)
            },
            pipe((millis: number) => dayjs(millis), dateIsPast)
          )
        )
      )
    )(snapshot)
  },
  toFirestore(modelObject: PartialWithFieldValue<Session>) {
    return pipe(
      modifyNumberPropToTimestamp<'expires', PartialWithFieldValue<Session>>('expires'),
      dissoc('expired')
    )(modelObject)
  }
}
