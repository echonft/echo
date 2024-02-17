import { echoGuild } from '@echo/bot/constants/echo-guild'
import { postListing } from '@echo/bot/listing/post-listing'
import { addListingPost } from '@echo/firestore/crud/listing-post/add-listing-post'
import { findListingPost } from '@echo/firestore/crud/listing-post/find-listing-post'
import { type DocumentChangeType } from '@echo/firestore/types/abstract/document-change-type'
import { type Listing } from '@echo/model/types/listing'
import { logger } from '@echo/utils/services/logger'
import { isNil } from 'ramda'

/**
 * Handles listing changes
 * @param changeType
 * @param listing
 */
export async function listingChangeHandler(changeType: DocumentChangeType, listing: Listing) {
  logger.info(`listing ${listing.id} was written: ${changeType}`)
  if (changeType === 'added') {
    const post = await findListingPost(listing.id, echoGuild.discordId)
    if (isNil(post)) {
      await postListing(listing)
      await addListingPost(listing.id, echoGuild)
    }
  }
}
