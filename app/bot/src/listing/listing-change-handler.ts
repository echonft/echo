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
  pinoLogger.info(`listing ${snapshot.id} was written: ${changeType}`)
  if (changeType === 'added') {
    // TODO Should probably consider that it can be posted to other servers but works for now
    const post = await getListingPost(snapshot.id, echoGuild.id)
    if (isNil(post)) {
      await postListing(snapshot.data())
      await addListingPost(snapshot.id, echoGuild)
    }
  }
}
