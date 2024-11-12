import { expireListingTask } from '@echo/firestore-functions/tasks/expire-listing-task'
import { enqueueTask } from '@echo/firestore-functions/tasks/helpers/enqueue-task'
import type { ListingDocument } from '@echo/firestore/types/model/listing-document'
import { unlessNil } from '@echo/utils/helpers/unless-nil'
import type { Nullable } from '@echo/utils/types/nullable'
import { andThen, pipe } from 'ramda'

export async function onListingCreatedTriggerHandler(document: Nullable<ListingDocument>) {
  await unlessNil(pipe(expireListingTask, andThen(enqueueTask)))(document)
}
