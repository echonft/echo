import { getFirestoreEventData } from '@echo/firestore-functions/helper/get-firestore-event-data'
import { getFunctionUrl } from '@echo/firestore-functions/helper/get-function-url'
import { getLogger } from '@echo/firestore-functions/helper/get-logger'
import { setMaxInstances } from '@echo/firestore-functions/helper/set-max-instances'
import type { Offer } from '@echo/model/types/offer'
import { getFunctions } from 'firebase-admin/functions'
import { onDocumentCreated } from 'firebase-functions/v2/firestore'
import { isNil } from 'ramda'

export const onOfferCreated = onDocumentCreated(setMaxInstances({ document: 'offers/{id}' }), async (event) => {
  const functionName = 'expireOffer'
  const logger = getLogger().child({ function: functionName })
  const offer = getFirestoreEventData<Offer>(event)
  if (!isNil(offer)) {
    const queue = getFunctions().taskQueue(functionName)
    const uri = await getFunctionUrl(functionName)
    if (!isNil(uri)) {
      try {
        await queue.enqueue(
          { slug: offer.slug },
          {
            scheduleTime: new Date(offer.expiresAt * 1000),
            uri
          }
        )
      } catch (err) {
        logger.error({ err }, 'error queuing offerExpire task')
      }
    }
  }
})
