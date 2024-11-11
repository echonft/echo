import { setMaxInstances } from '@echo/firestore-functions/helpers/set-max-instances'
import { setMaxTimeout } from '@echo/firestore-functions/helpers/set-max-timeout'
import { CollectionPath } from '@echo/firestore/constants/collection-path'
import { onDocumentCreated as firestoreOnDocumentCreated } from 'firebase-functions/v2/firestore'
import { __, concat, objOf, pipe } from 'ramda'

export function onDocumentCreated(
  collectionPath: CollectionPath,
  handler: Parameters<typeof firestoreOnDocumentCreated>[1]
) {
  const opts = pipe(concat(__, '/{id}'), objOf('document'), setMaxInstances, setMaxTimeout)(collectionPath)
  return firestoreOnDocumentCreated(opts, handler)
}
