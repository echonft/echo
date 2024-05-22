import { getFunctionUrl } from '@echo/firestore-functions/helper/get-function-url'
import { setMaxInstances } from '@echo/firestore-functions/helper/set-max-instances'
import type { Listing } from '@echo/model/types/listing'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { getFunctions } from 'firebase-admin/functions'
import { error } from 'firebase-functions/logger'
import { onDocumentCreated } from 'firebase-functions/v2/firestore'
import { isNil } from 'ramda'

export const onListingCreated = onDocumentCreated(setMaxInstances({ document: 'listings/{id}' }), async (event) => {
  const functionName = 'expireListing'
  const listingId = event.data?.id
  const listing = event.data?.data() as Listing
  if (!isNil(listing) && !isNil(listingId)) {
    const queue = getFunctions().taskQueue(functionName)
    const uri = await getFunctionUrl(functionName)
    if (!isNil(uri)) {
      try {
        await queue.enqueue(
          { listingId },
          {
            scheduleTime: new Date(listing.expiresAt * 1000),
            uri
          }
        )
      } catch (e) {
        error(`error queuing listingExpire task: ${errorMessage(e)}`)
      }
    }
  }
})
