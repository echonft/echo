import { expireListingTask } from '@echo/firestore-functions/tasks/expire-listing-task'
import { enqueueTask } from '@echo/firestore-functions/tasks/helpers/enqueue-task'
import type { ListingDocument } from '@echo/firestore/types/model/listing-document'
import type { Nullable } from '@echo/utils/types/nullable'
import { info } from 'firebase-functions/logger'
import { andThen, isNil, pipe } from 'ramda'

export async function onListingCreatedTriggerHandler(document: Nullable<ListingDocument>) {
  if (!isNil(document)) {
    info({ listing: document }, 'listing was created')
    await pipe(expireListingTask, andThen(enqueueTask))(document)
    info({ listing: document }, 'added expire listing task')
  }
}
