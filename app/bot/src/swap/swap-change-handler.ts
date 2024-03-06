import { echoGuild } from '@echo/bot/constants/echo-guild'
import { postListing } from '@echo/bot/listing/post-listing'
import { addListingPost } from '@echo/firestore/crud/listing-post/add-listing-post'
import { type DocumentChangeType } from '@echo/firestore/types/document-change-type'
import type { Swap } from '@echo/firestore/types/model/swap/swap'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import { isNil } from 'ramda'

/**
 * Handles swap changes
 * @param changeType
 * @param listing
 */
export async function swapChangeHandler(changeType: DocumentChangeType, swap: Swap) {
  pinoLogger.info(`swap ${swap.id} was written: ${changeType}`)
  if (changeType === 'added') {
    if (isNil(post)) {
      await postListing(listing)
      await addListingPost(listing.id, echoGuild)
    }
  }
}
