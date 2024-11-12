import type { CancelListingTaskData } from '@echo/firestore-functions/tasks/cancel-listing-task'
import { cancelListing } from '@echo/firestore/crud/listing/cancel-listing'
import { pipe, prop } from 'ramda'

export async function cancelListingRequestHandler(data: CancelListingTaskData) {
  await pipe(prop('slug'), cancelListing)(data)
}
