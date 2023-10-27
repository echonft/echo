import { guardedAddListingPost } from '@echo/bot/firestore/guarded-add-listing-post'
import { guardedFindListingPost } from '@echo/bot/firestore/guarded-find-listing-post'
import { guardedGetListingGuilds } from '@echo/bot/firestore/guarded-get-listing-guilds'
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
    const guilds = await guardedGetListingGuilds(listing)
    for (const guild of guilds) {
      const post = await guardedFindListingPost(listing.id, guild.guild.discordId)
      if (isNil(post)) {
        await postListing(client, listing, guild)
        await guardedAddListingPost(listing.id, { discordId: guild.guild.discordId, channelId: guild.guild.channelId })
      }
    }
  }
}
