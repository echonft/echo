import { getFunctionUrl } from '@echo/firestore-functions/helper/get-function-url'
import { setMaxInstances } from '@echo/firestore-functions/helper/set-max-instances'
import type { Listing } from '@echo/model/types/listing'
import { getFunctions } from 'firebase-admin/functions'
import { onDocumentCreated } from 'firebase-functions/v2/firestore'
import { isNil } from 'ramda'

export const onListingCreated = onDocumentCreated(setMaxInstances({ document: 'listings/{id}' }), async (event) => {
  const functionName = 'expireListing'
  const listing = event.data?.data() as Listing
  if (!isNil(listing)) {
    const queue = getFunctions().taskQueue(functionName)
    const uri = await getFunctionUrl(functionName)
    await queue.enqueue(
      { offerId: listing.id },
      {
        scheduleTime: new Date(listing.expiresAt * 1000),
        uri
      }
    )
  }
})
