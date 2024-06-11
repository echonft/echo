import { botLogger } from '@echo/bot/constants/bot-logger'
import { postListing } from '@echo/bot/listing/post-listing'
import { addListingPost } from '@echo/firestore/crud/listing-post/add-listing-post'
import { getListingPost } from '@echo/firestore/crud/listing-post/get-listing-post'
import { type DocumentChangeType } from '@echo/firestore/types/document-change-type'
import type { QueryDocumentSnapshot } from '@echo/firestore/types/query-document-snapshot'
import { type Listing } from '@echo/model/types/listing'
import { getEchoDiscordGuild } from '@echo/utils/helpers/get-echo-discord-guild'
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
    botLogger.info({ msg: `listing ${listingId} was added` })
    const echoGuild = getEchoDiscordGuild()
    const post = await getListingPost(snapshot.id, echoGuild.id)
    if (isNil(post)) {
      botLogger.info({ msg: `[LISTING ${listingId}] listing post does not exist, creating...` })
      await postListing(listing, listingId)
      const { id } = await addListingPost(listingId, echoGuild)
      botLogger.info({ msg: `[LISTING ${listingId}] post ${id}added to Firestore` })
    } else {
      botLogger.info({ msg: `[LISTING ${listingId}] listing post already exists, nothing to do` })
    }
  }
}
