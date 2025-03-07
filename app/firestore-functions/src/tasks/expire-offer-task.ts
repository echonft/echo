import { CloudFunctionName } from '@echo/firestore-functions/constants/cloud-function-name'
import { cloudFunctionUrl } from '@echo/firestore-functions/helpers/cloud-function-url'
import type { Task } from '@echo/firestore-functions/types/task'
import type { OfferDocument } from '@echo/firestore/types/model/offer-document'
import { serializeOffer } from '@echo/model/serializers/serialize-offer'
import { pick } from 'ramda'

export type ExpireOfferTaskData = Pick<OfferDocument, 'slug'>

export async function expireOfferTask(offer: OfferDocument): Promise<Task<ExpireOfferTaskData>> {
  const name = CloudFunctionName.ExpireOffer
  const uri = await cloudFunctionUrl(name)
  return {
    data: pick(['slug'], offer),
    name,
    options: {
      id: `${name}-${serializeOffer(offer)}`,
      scheduleTime: new Date(offer.expiresAt * 1000),
      uri
    }
  }
}
