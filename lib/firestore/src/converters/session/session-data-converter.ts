import { getSnapshotData } from '@echo/firestore/helpers/converters/from-firestore/get-snapshot-data'
import { modifyTimestampPropToDate } from '@echo/firestore/helpers/converters/from-firestore/modify-timestamp-prop-to-date'
import { modifyDatePropToTimestamp } from '@echo/firestore/helpers/converters/to-firestore/modify-date-prop-to-timestamp'
import { FirestoreSession } from '@echo/firestore/types/model/session/firestore-session'
import { SessionDocumentData } from '@echo/firestore/types/model/session/session-document-data'
import type { FirestoreDataConverter, QueryDocumentSnapshot } from 'firebase-admin/lib/firestore'
import { PartialWithFieldValue } from 'firebase-admin/lib/firestore'
import { pipe } from 'ramda'

export const sessionDataConverter: FirestoreDataConverter<FirestoreSession> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<SessionDocumentData>) {
    return pipe(getSnapshotData<SessionDocumentData>, modifyTimestampPropToDate('expires'))(snapshot)
  },
  toFirestore(modelObject: PartialWithFieldValue<FirestoreSession>): SessionDocumentData {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return modifyDatePropToTimestamp('expires', modelObject)
  }
}
