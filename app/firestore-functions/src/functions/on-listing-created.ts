import { enqueueTask } from '@echo/firestore-functions/helpers/enqueue-task'
import { getFirestoreEventData } from '@echo/firestore-functions/helpers/get-firestore-event-data'
import { onDocumentCreated } from '@echo/firestore-functions/helpers/on-document-created'
import { expireListingTask } from '@echo/firestore-functions/tasks/expire-listing-task'
import { CollectionPath } from '@echo/firestore/constants/collection-path'
import type { ListingDocument } from '@echo/firestore/types/model/listing-document'
import { unlessNil } from '@echo/utils/helpers/unless-nil'
import { andThen, pipe } from 'ramda'

export const onListingCreated = onDocumentCreated(CollectionPath.Listings, async (event) => {
  const listing = getFirestoreEventData<ListingDocument>(event)
  await unlessNil(pipe(expireListingTask, andThen(enqueueTask)))(listing)
})
