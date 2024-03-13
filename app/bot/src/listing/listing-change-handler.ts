import { echoGuild } from '@echo/bot/constants/echo-guild'
import { postListing } from '@echo/bot/listing/post-listing'
import { addListingPost } from '@echo/firestore/crud/listing-post/add-listing-post'
import { findListingPost } from '@echo/firestore/crud/listing-post/find-listing-post'
import { type DocumentChangeType } from '@echo/firestore/types/document-change-type'
import { type Listing } from '@echo/model/types/listing'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import { isNil } from 'ramda'

/**
 * Handles listing changes
 * @param changeType
 * @param listing
 */
export async function listingChangeHandler(changeType: DocumentChangeType, listing: Listing) {
  pinoLogger.info(`listing ${listing.id} was written: ${changeType}`)
  if (changeType === 'added') {
    // TODO Should probably consider that it can be posted to other servers but works for now
    const post = await findListingPost(listing.id, echoGuild.discordId)
    if (isNil(post)) {
      await postListing(listing)
      await addListingPost(listing.id, echoGuild)
    }
  }
}
