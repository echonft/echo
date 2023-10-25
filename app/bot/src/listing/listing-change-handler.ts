import { postListing } from '@echo/bot/listing/post-listing'
import { findListingPost } from '@echo/firestore/crud/listing-post/find-listing-post'
import { getListingGuilds } from '@echo/firestore/helpers/listing/get-listing-guilds'
import { type DocumentChangeType } from '@echo/firestore/types/abstract/document-change-type'
import { type Listing } from '@echo/model/types/listing'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { logger } from '@echo/utils/services/logger'
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
    try {
      const guilds = await getListingGuilds(listing)
      for (const guild of guilds) {
        const post = await findListingPost(listing.id, guild.guild.discordId)
        if (isNil(post)) {
          await postListing(client, listing, guild)
        }
      }
    } catch (e) {
      logger.error(`Error while listening to added listings: ${errorMessage(e)}`)
    }
  }
}
