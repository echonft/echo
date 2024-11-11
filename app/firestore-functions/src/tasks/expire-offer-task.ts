import { CloudFunctionName } from '@echo/firestore-functions/constants/cloud-function-name'
import { getCloudFunctionUrl } from '@echo/firestore-functions/helpers/get-cloud-function-url'
import type { Task } from '@echo/firestore-functions/types/task'
import type { OfferDocument } from '@echo/firestore/types/model/offer-document'
import { serializeOffer } from '@echo/model/serializers/serialize-offer'
import type { Slug } from '@echo/model/types/slug'

export async function expireOfferTask(offer: OfferDocument): Promise<Task<Record<'slug', Slug>>> {
  const name = CloudFunctionName.ExpireOffer
  const uri = await getCloudFunctionUrl(name)
  return {
    data: { slug: offer.slug },
    name,
    options: {
      id: `${name}-${serializeOffer(offer)}`,
      scheduleTime: new Date(offer.expiresAt * 1000),
      uri
    }
  }
}
