import { setMaxInstances } from '@echo/firestore-functions/helpers/set-max-instances'
import { setMaxTimeout } from '@echo/firestore-functions/helpers/set-max-timeout'
import { CollectionPath } from '@echo/firestore/constants/collection-path'
import { onDocumentWritten as firestoreOnDocumentWritten } from 'firebase-functions/v2/firestore'
import { __, concat, objOf, pipe } from 'ramda'

export function onDocumentWritten(
  collectionPath: CollectionPath,
  handler: Parameters<typeof firestoreOnDocumentWritten>[1]
) {
  const opts = pipe(concat(__, '/{id}'), objOf('document'), setMaxInstances, setMaxTimeout)(collectionPath)
  return firestoreOnDocumentWritten(opts, handler)
}
