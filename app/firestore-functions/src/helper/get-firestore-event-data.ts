import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import { unlessNil } from '@echo/utils/fp/unless-nil'
import type { Nullable } from '@echo/utils/types/nullable'
import type { FirestoreEvent, QueryDocumentSnapshot } from 'firebase-functions/v2/firestore'
import { pipe, prop } from 'ramda'

export function getFirestoreEventData<Model, Document = Record<'id', string>>(
  event: FirestoreEvent<QueryDocumentSnapshot | undefined, Document> | undefined
): Nullable<Model> {
  return pipe(prop('data'), unlessNil(getDocumentSnapshotData<Model>))(event)
}
