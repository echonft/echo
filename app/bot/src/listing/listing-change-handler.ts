import { guarded_addListingPost } from '@echo/bot/firestore/guarded_add-listing-post'
import { guarded_findListingPost } from '@echo/bot/firestore/guarded_find-listing-post'
import { guarded_getListingGuilds } from '@echo/bot/firestore/guarded_get-listing-guilds'
import { postListing } from '@echo/bot/listing/post-listing'
import { type DocumentChangeType } from '@echo/firestore/types/abstract/document-change-type'
import { type Listing } from '@echo/model/types/listing'
import { Client } from 'discord.js'
import { isNil } from 'ramda'

/**
 * Handles listing changes - only check for new listings
 * @param client
 * @param changeType
 * @param listing
 */
export async function listingChangeHandler(client: Client, changeType: DocumentChangeType, listing: Listing) {
  if (changeType === 'added') {
    const guilds = await guarded_getListingGuilds(listing)
    for (const guild of guilds) {
      const post = await guarded_findListingPost(listing.id, guild.guild.discordId)
      if (isNil(post)) {
        await postListing(client, listing, guild)
        await guarded_addListingPost(listing.id, { discordId: guild.guild.discordId, channelId: guild.guild.channelId })
      }
    }
  }
}
