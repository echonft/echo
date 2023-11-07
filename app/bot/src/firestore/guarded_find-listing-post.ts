import { findListingPost } from '@echo/firestore/crud/listing-post/find-listing-post'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { logger } from '@echo/utils/services/logger'

export async function guarded_findListingPost(listingId: string, guildId: string) {
  try {
    return await findListingPost(listingId, guildId)
  } catch (e) {
    logger.error(`Error fetching post with guild id ${guildId} for listing ${listingId}: ${errorMessage(e)}`)
    return undefined
  }
}
