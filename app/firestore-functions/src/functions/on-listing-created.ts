import { CloudFunctionName } from '@echo/firestore-functions/constants/cloud-function-name'
import { CloudFunctionError } from '@echo/firestore-functions/constants/errors/cloud-function-error'
import { error } from '@echo/firestore-functions/constants/logger'
import { getCloudFunctionUrl } from '@echo/firestore-functions/helpers/get-cloud-function-url'
import { getFirestoreEventData } from '@echo/firestore-functions/helpers/get-firestore-event-data'
import { setMaxInstances } from '@echo/firestore-functions/helpers/set-max-instances'
import type { ExpireListingTaskArgs } from '@echo/firestore-functions/types/expire-listing-task-args'
import { CollectionPath } from '@echo/firestore/constants/collection-path'
import type { ListingDocument } from '@echo/firestore/types/model/listing-document'
import { getFunctions } from 'firebase-admin/functions'
import { onDocumentCreated } from 'firebase-functions/v2/firestore'
import { isNil } from 'ramda'

export const onListingCreated = onDocumentCreated(
  setMaxInstances({ document: `${CollectionPath.Listings}/{id}` }),
  async (event) => {
    const listing = getFirestoreEventData<ListingDocument>(event)
    if (!isNil(listing)) {
      const queue = getFunctions().taskQueue<ExpireListingTaskArgs>(CloudFunctionName.ExpireListing)
      const uri = await getCloudFunctionUrl(CloudFunctionName.ExpireListing)
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
          error({ err, function: CloudFunctionName.ExpireListing }, CloudFunctionError.Queue)
        }
      }
    }
  }
)
