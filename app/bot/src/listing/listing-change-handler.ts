import { postListing } from '@echo/bot/listing/post-listing'
import { addListingPost } from '@echo/firestore/crud/listing-post/add-listing-post'
import { findListingPost } from '@echo/firestore/crud/listing-post/find-listing-post'
import { getListingGuilds } from '@echo/firestore/helpers/listing/get-listing-guilds'
import { type DocumentChangeType } from '@echo/firestore/types/abstract/document-change-type'
import { type Listing } from '@echo/model/types/listing'
import { logger } from '@echo/utils/services/logger'
import { Client } from 'discord.js'
import { isNil } from 'ramda'

/**
 * Handles listing changes
 * @param client
 * @param changeType
 * @param listing
 */
export async function listingChangeHandler(client: Client, changeType: DocumentChangeType, listing: Listing) {
  logger.info(`listing ${listing.id} was written: ${changeType}`)
  if (changeType === 'added') {
    const guilds = await getListingGuilds(listing)
    for (const guild of guilds) {
      const post = await findListingPost(listing.id, guild.guild.discordId)
      if (isNil(post)) {
        await postListing(client, listing, guild)
        await addListingPost(listing.id, {
          discordId: guild.guild.discordId,
          channelId: guild.guild.channelId
        })
      }
    }
  }
}
