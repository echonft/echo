import { CloudFunctionName } from '@echo/firestore-functions/constants/cloud-function-name'
import { CloudFunctionError } from '@echo/firestore-functions/constants/errors/cloud-function-error'
import { error } from '@echo/firestore-functions/constants/logger'
import { getCloudFunctionUrl } from '@echo/firestore-functions/helpers/get-cloud-function-url'
import { getFirestoreEventData } from '@echo/firestore-functions/helpers/get-firestore-event-data'
import { setMaxInstances } from '@echo/firestore-functions/helpers/set-max-instances'
import { CollectionPath } from '@echo/firestore/constants/collection-path'
import type { OfferDocument } from '@echo/firestore/types/model/offer-document'
import { getFunctions } from 'firebase-admin/functions'
import { onDocumentCreated } from 'firebase-functions/v2/firestore'
import { isNil } from 'ramda'

export const onOfferCreated = onDocumentCreated(
  setMaxInstances({ document: `${CollectionPath.Offers}/{id}` }),
  async (event) => {
    const offer = getFirestoreEventData<OfferDocument>(event)
    if (!isNil(offer)) {
      const queue = getFunctions().taskQueue(CloudFunctionName.ExpireOffer)
      const uri = await getCloudFunctionUrl(CloudFunctionName.ExpireOffer)
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
          error({ err, function: CloudFunctionName.ExpireOffer }, CloudFunctionError.Queue)
        }
      }
    }
  }
)
