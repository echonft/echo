import {
  firestoreEventChangeSnapshotData,
  type FirestoreEventChangeSnapshotDataReturn
} from '@echo/firestore-functions/firestore-triggers/helpers/firestore-event-change-snapshot-data'
import { setMaxInstances } from '@echo/firestore-functions/helpers/set-max-instances'
import { setMaxTimeout } from '@echo/firestore-functions/helpers/set-max-timeout'
import { CollectionPath } from '@echo/firestore/constants/collection-path'
import type { Awaitable } from '@echo/utils/types/awaitable'
import { onDocumentUpdated as firestoreOnDocumentUpdated } from 'firebase-functions/v2/firestore'
import { __, concat, objOf, pipe } from 'ramda'

export function onDocumentUpdated<AppModelType>(
  collectionPath: CollectionPath,
  handler: (args: FirestoreEventChangeSnapshotDataReturn<AppModelType>) => Awaitable<void>
) {
  const opts = pipe(concat(__, '/{id}'), objOf('document'), setMaxInstances, setMaxTimeout)(collectionPath)
  return firestoreOnDocumentUpdated(opts, pipe(firestoreEventChangeSnapshotData, handler))
}
