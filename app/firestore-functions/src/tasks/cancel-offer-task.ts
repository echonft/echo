import { CloudFunctionName } from '@echo/firestore-functions/constants/cloud-function-name'
import { cloudFunctionUrl } from '@echo/firestore-functions/helpers/cloud-function-url'
import type { Task } from '@echo/firestore-functions/types/task'
import type { OfferDocument } from '@echo/firestore/types/model/offer-document'
import { serializeOffer } from '@echo/model/serializers/serialize-offer'
import { pick } from 'ramda'

export type CancelOfferTaskData = Pick<OfferDocument, 'slug'>

export async function cancelOfferTask(offer: OfferDocument): Promise<Task<CancelOfferTaskData>> {
  const name = CloudFunctionName.CancelOffer
  const uri = await cloudFunctionUrl(name)
  return {
    data: pick(['slug'], offer),
    name,
    options: {
      id: `${name}-${serializeOffer(offer)}`,
      uri
    }
  }
}
