import { getFunctionUrl } from '@echo/firestore-functions/helper/get-function-url'
import { setMaxInstances } from '@echo/firestore-functions/helper/set-max-instances'
import type { Offer } from '@echo/model/types/offer'
import { getFunctions } from 'firebase-admin/functions'
import { onDocumentCreated } from 'firebase-functions/v2/firestore'
import { isNil } from 'ramda'

export const onOfferCreated = onDocumentCreated(setMaxInstances({ document: 'offers/{id}' }), async (event) => {
  const functionName = 'expireOffer'
  const offer = event.data?.data() as Offer
  if (!isNil(offer)) {
    const queue = getFunctions().taskQueue(functionName)
    const uri = await getFunctionUrl(functionName)
    await queue.enqueue(
      { offerId: offer.id },
      {
        scheduleTime: new Date(offer.expiresAt * 1000),
        uri
      }
    )
  }
})
