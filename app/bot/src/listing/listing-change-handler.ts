import { echoGuild } from '@echo/bot/constants/echo-guild'
import { postListing } from '@echo/bot/listing/post-listing'
import { addListingPost } from '@echo/firestore/crud/listing-post/add-listing-post'
import { getListingPost } from '@echo/firestore/crud/listing-post/get-listing-post'
import { type DocumentChangeType } from '@echo/firestore/types/document-change-type'
import type { QueryDocumentSnapshot } from '@echo/firestore/types/query-document-snapshot'
import { type Listing } from '@echo/model/types/listing'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import { isNil } from 'ramda'

/**
 * Handles listing changes
 * @param changeType
 * @param snapshot
 */
export async function listingChangeHandler(changeType: DocumentChangeType, snapshot: QueryDocumentSnapshot<Listing>) {
  if (changeType === 'added') {
    const listingId = snapshot.id
    const listing = snapshot.data()
    pinoLogger.info(`listing ${listingId} was added`)
    const post = await getListingPost(snapshot.id, echoGuild.id)
    if (isNil(post)) {
      pinoLogger.info(`[LISTING ${listingId}] listing post does not exist, creating...`)
      await postListing(listing, listingId)
      const { id } = await addListingPost(listingId, echoGuild)
      pinoLogger.info(`[LISTING ${listingId}] post ${id}added to Firestore`)
    } else {
      pinoLogger.info(`[LISTING ${listingId}] listing post already exists, nothing to do`)
    }
  }
}
