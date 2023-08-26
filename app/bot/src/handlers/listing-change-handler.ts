import { buildNewListingButtons } from '../builders/listing-button-builder'
import { buildListingEmbed } from '../builders/listing-embed-builder'
import { getDiscordChannel } from '../helpers/get-discord-channel'
import {
  DocumentChangeType,
  getListingItemsGuild,
  getListingTargetsGuilds,
  Listing,
  NftCollectionDiscordGuild
} from '@echo/firestore'
import { errorMessage, logger } from '@echo/utils'
import { Client } from 'discord.js'

async function postListingToGuild(client: Client, listing: Listing, discordGuild: NftCollectionDiscordGuild) {
  const channel = await getDiscordChannel(client, discordGuild.channelId)
  await channel.send({
    components: [buildNewListingButtons(listing.id, discordGuild.discordId)],
    embeds: [buildListingEmbed(listing)]
  })
}
/**
 * Handles listing changes - only check for new listings
 * @param client
 * @param changeType
 * @param listing
 */
export async function listingChangeHandler(client: Client, changeType: DocumentChangeType, listing: Listing) {
  if (changeType === 'added') {
    try {
      const listingItemsGuild = getListingItemsGuild(listing)
      await postListingToGuild(client, listing, listingItemsGuild)
      const targetsGuilds = getListingTargetsGuilds(listing)
      for (const targetGuild of targetsGuilds) {
        await postListingToGuild(client, listing, targetGuild)
      }
    } catch (e) {
      logger.error(`Error while listening to added listings: ${errorMessage(e)}`)
    }
  }
}
