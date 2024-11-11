import { enqueueTask } from '@echo/firestore-functions/helpers/enqueue-task'
import { getFirestoreEventData } from '@echo/firestore-functions/helpers/get-firestore-event-data'
import { onDocumentCreated } from '@echo/firestore-functions/helpers/on-document-created'
import { addCollectionNftsTask } from '@echo/firestore-functions/tasks/add-collection-nfts-task'
import { CollectionPath } from '@echo/firestore/constants/collection-path'
import type { CollectionDocument } from '@echo/firestore/types/model/collection-document'
import { unlessNil } from '@echo/utils/helpers/unless-nil'
import { andThen, pipe } from 'ramda'

export const onCollectionCreated = onDocumentCreated(CollectionPath.Collections, async (event) => {
  const collection = getFirestoreEventData<CollectionDocument>(event)
  await unlessNil(pipe(addCollectionNftsTask, andThen(enqueueTask)))(collection)
})
