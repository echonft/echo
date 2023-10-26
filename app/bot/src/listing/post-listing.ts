import { getChannel } from '@echo/bot/helpers/get-channel'
import { buildListingEmbed } from '@echo/bot/listing/build-listing-embed'
import { buildListingLinkButton } from '@echo/bot/listing/build-listing-link-button'
import { findCollectionById } from '@echo/firestore/crud/collection/find-collection-by-id'
import { addListingPost } from '@echo/firestore/crud/listing-post/add-listing-post'
import { findUserByUsername } from '@echo/firestore/crud/user/find-user-by-username'
import type { CollectionDiscordGuild } from '@echo/firestore/types/model/collection-discord-guild/collection-discord-guild'
import type { Listing } from '@echo/model/types/listing'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { logger } from '@echo/utils/services/logger'
import { Client } from 'discord.js'
import { isNil } from 'ramda'

export async function postListing(client: Client, listing: Listing, guild: CollectionDiscordGuild) {
  const {
    id: listingId,
    creator: { username }
  } = listing
  const {
    collectionId,
    guild: { channelId, discordId }
  } = guild
  const creator = await findUserByUsername(username)
  const collection = await findCollectionById(collectionId)
  if (!isNil(creator) && !isNil(collection)) {
    try {
      const channel = await getChannel(client, channelId)
      await channel.send({
        components: [buildListingLinkButton(collection.slug, listingId)],
        embeds: [buildListingEmbed(listing, creator, collection)]
      })
      await addListingPost(listingId, { discordId, channelId })
    } catch (e) {
      logger.error(`Error posting listing ${listing.id}: ${errorMessage(e)}`)
    }
  }
}
