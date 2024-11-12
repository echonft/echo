import { ListingError } from '@echo/firestore-functions/constants/errors/listing-error'
import { error } from '@echo/firestore-functions/constants/logger'
import type { ExpireListingTaskData } from '@echo/firestore-functions/tasks/expire-listing-task'
import { expireListing } from '@echo/firestore/crud/listing/expire-listing'
import { withSlugSchema } from '@echo/model/validators/slug-schema'
import { otherwise, pipe } from 'ramda'

export async function expireListingTaskRequestHandler(data: ExpireListingTaskData) {
  const { slug } = withSlugSchema.parse(data)
  await pipe(
    expireListing,
    otherwise((err) => {
      error({ err, listing: { slug } }, ListingError.Expire)
    })
  )(slug)
}
