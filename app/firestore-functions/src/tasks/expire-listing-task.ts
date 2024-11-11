import { CloudFunctionName } from '@echo/firestore-functions/constants/cloud-function-name'
import { getCloudFunctionUrl } from '@echo/firestore-functions/helpers/get-cloud-function-url'
import type { Task } from '@echo/firestore-functions/types/task'
import type { ListingDocument } from '@echo/firestore/types/model/listing-document'
import { serializeListing } from '@echo/model/serializers/serialize-listing'
import type { Slug } from '@echo/model/types/slug'

export async function expireListingTask(listing: ListingDocument): Promise<Task<Record<'slug', Slug>>> {
  const name = CloudFunctionName.ExpireListing
  const uri = await getCloudFunctionUrl(name)
  return {
    data: { slug: listing.slug },
    name,
    options: {
      id: `${name}-${serializeListing(listing)}`,
      scheduleTime: new Date(listing.expiresAt * 1000),
      uri
    }
  }
}
