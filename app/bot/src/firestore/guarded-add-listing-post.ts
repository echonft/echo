import { addListingPost } from '@echo/firestore/crud/listing-post/add-listing-post'
import type { ListingPostDiscordGuild } from '@echo/firestore/types/model/listing-post/listing-post'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { logger } from '@echo/utils/services/logger'

export async function guardedAddListingPost(listingId: string, guild: ListingPostDiscordGuild) {
  try {
    await addListingPost(listingId, guild)
  } catch (e) {
    logger.error(`Error adding post for listing: ${listingId}: ${errorMessage(e)}`)
  }
}
