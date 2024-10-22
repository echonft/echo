import { postListing } from '@echo/bot/listing/post-listing'
import type { WithClientType } from '@echo/bot/types/with-client'
import { addListingPost } from '@echo/firestore/crud/listing-post/add-listing-post'
import { getListingPost } from '@echo/firestore/crud/listing-post/get-listing-post'
import type { ListingChangeHandlerArgs } from '@echo/firestore/types/change-handler/listing-change-handler'
import { getEchoDiscordGuild } from '@echo/utils/helpers/get-echo-discord-guild'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { assoc, isNil } from 'ramda'

export async function listingChangeHandler(args: WithLoggerType<WithClientType<ListingChangeHandlerArgs>>) {
  const { client, changeType, snapshot, logger } = args
  if (changeType === 'added') {
    const listingId = snapshot.id
    const listing = snapshot.data()
    const listingWithId = assoc('id', listingId, listing)
    logger?.info({ listing: listingWithId }, 'listing was added')
    const echoGuild = getEchoDiscordGuild()
    const post = await getListingPost({ listingId: snapshot.id, guildId: echoGuild.id })
    if (isNil(post)) {
      logger?.info({ listing: listingWithId }, 'listing post does not exist, creating...')
      await postListing({ client, listing: listingWithId, logger })
      const { id } = await addListingPost({ listingId, guild: echoGuild })
      logger?.info({ listing: listingWithId, listingPost: assoc('id', id, post) }, `post ${id} added to Firestore`)
    } else {
      logger?.info({ listing: listingWithId }, 'listing post already exists, nothing to do')
    }
  }
}
