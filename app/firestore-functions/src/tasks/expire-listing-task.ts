import { CloudFunctionName } from '@echo/firestore-functions/constants/cloud-function-name'
import { cloudFunctionUrl } from '@echo/firestore-functions/helpers/cloud-function-url'
import type { Task } from '@echo/firestore-functions/types/task'
import type { ListingDocument } from '@echo/firestore/types/model/listing-document'
import { serializeListing } from '@echo/model/serializers/serialize-listing'
import { pick } from 'ramda'

export type ExpireListingTaskData = Pick<ListingDocument, 'slug'>

export async function expireListingTask(listing: ListingDocument): Promise<Task<ExpireListingTaskData>> {
  const name = CloudFunctionName.ExpireListing
  const uri = await cloudFunctionUrl(name)
  return {
    data: pick(['slug'], listing),
    name,
    options: {
      id: `${name}-${serializeListing(listing)}`,
      scheduleTime: new Date(listing.expiresAt * 1000),
      uri
    }
  }
}
