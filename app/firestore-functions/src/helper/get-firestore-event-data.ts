import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import type { WithId } from '@echo/model/types/with-id'
import { unlessNil } from '@echo/utils/fp/unless-nil'
import type { Nullable } from '@echo/utils/types/nullable'
import type { FirestoreEvent, QueryDocumentSnapshot } from 'firebase-functions/v2/firestore'
import { pipe, prop } from 'ramda'

export function getFirestoreEventData<Model, Document = WithId>(
  event: FirestoreEvent<QueryDocumentSnapshot | undefined, Document> | undefined
): Nullable<Model> {
  return pipe(prop('data'), unlessNil(getDocumentSnapshotData<Model>))(event)
}
