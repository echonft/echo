import { firestoreEventSnapshotData } from '@echo/firestore-functions/firestore-triggers/helpers/firestore-event-snapshot-data'
import { setMaxInstances } from '@echo/firestore-functions/helpers/set-max-instances'
import { setMaxTimeout } from '@echo/firestore-functions/helpers/set-max-timeout'
import { CollectionPath } from '@echo/firestore/constants/collection-path'
import type { Awaitable } from '@echo/utils/types/awaitable'
import type { Nullable } from '@echo/utils/types/nullable'
import { onDocumentCreated as firestoreOnDocumentCreated } from 'firebase-functions/v2/firestore'
import { __, concat, objOf, pipe } from 'ramda'

export function onDocumentCreated<AppModelType>(
  collectionPath: CollectionPath,
  handler: (document: Nullable<AppModelType>) => Awaitable<void>
) {
  const opts = pipe(concat(__, '/{id}'), objOf('document'), setMaxInstances, setMaxTimeout)(collectionPath)
  return firestoreOnDocumentCreated(opts, pipe(firestoreEventSnapshotData<AppModelType>, handler))
}
