import { ListingError } from '@echo/firestore-functions/constants/errors/listing-error'
import { error } from '@echo/firestore-functions/constants/logger'
import type { ExpireListingTaskData } from '@echo/firestore-functions/tasks/expire-listing-task'
import { expireListing } from '@echo/firestore/crud/listing/expire-listing'
import { getListing } from '@echo/firestore/crud/listing/get-listing'
import type { Listing } from '@echo/model/types/listing'
import { withSlugSchema } from '@echo/model/validators/slug-schema'
import type { Nullable } from '@echo/utils/types/nullable'
import { always, isNil, otherwise, pipe } from 'ramda'

export async function expireListingTaskRequestHandler(data: ExpireListingTaskData) {
  const { slug } = withSlugSchema.parse(data)
  const listing = await pipe(getListing, otherwise(always<Nullable<Listing>>(undefined)))(slug)
  if (!isNil(listing) && !listing.locked) {
    await pipe(
      expireListing,
      otherwise((err) => {
        error({ err, listing: { slug } }, ListingError.Expire)
      })
    )(slug)
  }
}
