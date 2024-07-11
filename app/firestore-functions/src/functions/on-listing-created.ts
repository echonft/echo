import { getFirestoreEventData } from '@echo/firestore-functions/helper/get-firestore-event-data'
import { getFunctionUrl } from '@echo/firestore-functions/helper/get-function-url'
import { getLogger } from '@echo/firestore-functions/helper/get-logger'
import { setMaxInstances } from '@echo/firestore-functions/helper/set-max-instances'
import type { Listing } from '@echo/model/types/listing'
import { getFunctions } from 'firebase-admin/functions'
import { onDocumentCreated } from 'firebase-functions/v2/firestore'
import { isNil } from 'ramda'

export const onListingCreated = onDocumentCreated(setMaxInstances({ document: 'listings/{id}' }), async (event) => {
  const functionName = 'expireListing'
  const logger = getLogger().child({ function: functionName })
  const listing = getFirestoreEventData<Listing>(event)
  if (!isNil(listing)) {
    const queue = getFunctions().taskQueue(functionName)
    const uri = await getFunctionUrl(functionName)
    if (!isNil(uri)) {
      try {
        await queue.enqueue(
          { slug: listing.slug },
          {
            scheduleTime: new Date(listing.expiresAt * 1000),
            uri
          }
        )
      } catch (err) {
        logger.error({ err }, 'error queuing listingExpire task')
      }
    }
  }
})
