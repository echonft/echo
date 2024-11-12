import { cancelListingTask } from '@echo/firestore-functions/tasks/cancel-listing-task'
import type { CancelNftListingsTaskData } from '@echo/firestore-functions/tasks/cancel-nft-listings-task'
import { enqueueTask } from '@echo/firestore-functions/tasks/helpers/enqueue-task'
import { getListingsForNft } from '@echo/firestore/crud/listing/get-listings-for-nft'
import { andThen, pipe } from 'ramda'

export async function cancelNftListingsRequestHandler(data: CancelNftListingsTaskData) {
  const listings = await getListingsForNft(data)
  for (const listing of listings) {
    await pipe(cancelListingTask, andThen(enqueueTask))(listing)
  }
}
