import { guarded_findCollectionById } from '@echo/bot/firestore/guarded_find-collection-by-id'
import { guarded_findUserByUsername } from '@echo/bot/firestore/guarded_find-user-by-username'
import { getChannel } from '@echo/bot/helpers/get-channel'
import { sendToChannel } from '@echo/bot/helpers/send-to-channel'
import { buildListingEmbed } from '@echo/bot/listing/build-listing-embed'
import { buildListingLinkButton } from '@echo/bot/listing/build-listing-link-button'
import type { CollectionDiscordGuild } from '@echo/firestore/types/model/collection-discord-guild/collection-discord-guild'
import type { Listing } from '@echo/model/types/listing'
import { Client } from 'discord.js'
import { isNil } from 'ramda'

export async function postListing(client: Client, listing: Listing, guild: CollectionDiscordGuild) {
  const {
    id: listingId,
    creator: { username }
  } = listing
  const {
    collectionId,
    guild: { channelId }
  } = guild
  const creator = await guarded_findUserByUsername(username)
  if (isNil(creator)) {
    return
  }
  const collection = await guarded_findCollectionById(collectionId)
  if (isNil(collection)) {
    return
  }
  const channel = await getChannel(client, channelId)
  if (isNil(channel)) {
    return
  }
  await sendToChannel(channel, {
    components: [buildListingLinkButton(collection.slug, listingId)],
    embeds: [buildListingEmbed(listing, creator, collection)]
  })
}
