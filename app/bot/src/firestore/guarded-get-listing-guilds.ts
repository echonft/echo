import { getListingGuilds } from '@echo/firestore/helpers/listing/get-listing-guilds'
import type { Listing } from '@echo/model/types/listing'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { logger } from '@echo/utils/services/logger'

export async function guardedGetListingGuilds(listing: Listing) {
  try {
    return await getListingGuilds(listing)
  } catch (e) {
    logger.error(`Error fetching guilds for listing ${listing.id}: ${errorMessage(e)}`)
    return []
  }
}
