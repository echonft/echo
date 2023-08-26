import { buildNewListingButtons } from '../builders/listing-button-builder'
import { buildListingEmbed } from '../builders/listing-embed-builder'
import { getDiscordChannel } from '../helpers/get-discord-channel'
import { DocumentChangeType, getListingGuild, Listing, postListing } from '@echo/firestore'
import { errorMessage, logger } from '@echo/utils'
import { Client } from 'discord.js'

/**
 * Handles listing changes - only check for new listings
 * @param client
 * @param changeType
 * @param listing
 */
export async function listingChangeHandler(client: Client, changeType: DocumentChangeType, listing: Listing) {
  if (changeType === 'added') {
    try {
      const discordGuild = getListingGuild(listing)
      const channel = await getDiscordChannel(client, discordGuild.channelId)
      await channel.send({
        components: [buildNewListingButtons(listing.id, discordGuild.discordId)],
        embeds: [buildListingEmbed(listing)]
      })
      await postListing(listing.id)
    } catch (e) {
      logger.error(`Error while listening to added listings: ${errorMessage(e)}`)
    }
  }
}
