import { postListing } from '@echo/bot/listing/post-listing'
import { addListingPost } from '@echo/firestore/crud/listing-post/add-listing-post'
import { getListingPost } from '@echo/firestore/crud/listing-post/get-listing-post'
import type { ListingChangeHandlerArgs } from '@echo/firestore/types/change-handler/listing-change-handler'
import { echoDiscordGuild } from '@echo/utils/helpers/echo-discord-guild'
import { assoc, isNil } from 'ramda'

export async function listingChangeHandler({ changeType, snapshot }: ListingChangeHandlerArgs) {
  if (changeType === 'added') {
    const listingId = snapshot.id
    const listing = snapshot.data()
    const listingWithId = assoc('id', listingId, listing)
    logger.info({ listing: listingWithId }, 'listing was added')
    const echoGuild = echoDiscordGuild()
    const post = await getListingPost({ listingId: snapshot.id, guildId: echoGuild.id })
    if (isNil(post)) {
      await postListing(listingWithId)
      const { id } = await addListingPost({ listingId, guild: echoGuild })
      logger.info({ listing: listingWithId, listingPost: assoc('id', id, post) }, 'post added to Firestore')
    } else {
      logger.info({ listing: listingWithId }, 'listing post already exists, nothing to do')
    }
  }
}
