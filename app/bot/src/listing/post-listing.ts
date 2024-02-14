import { sendToChannel } from '@echo/bot/helpers/send-to-channel'
import { buildListingEmbed } from '@echo/bot/listing/build-listing-embed'
import { buildListingLinkButton } from '@echo/bot/listing/build-listing-link-button'
import { findUserByUsername } from '@echo/firestore/crud/user/find-user-by-username'
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
    guild: { channelId }
  } = guild
  const creator = await findUserByUsername(username)
  if (isNil(creator)) {
    throw Error(`listing creator with username ${username} not found`)
  }
  await sendToChannel(client, channelId, {
    components: [buildListingLinkButton(listingId)],
    embeds: [buildListingEmbed(listing, creator)]
  })
}
