import { buildNewListingButtons } from '../builders/listing-button-builder'
import { buildListingEmbed } from '../builders/listing-embed-builder'
import { getDiscordChannel } from '../helpers/get-discord-channel'
import { getListingItemsGuild } from '@echo/firestore/helpers/listing/get-listing-items-guild'
import { getListingTargetsGuilds } from '@echo/firestore/helpers/listing/get-listing-targets-guilds'
import type { DocumentChangeType } from '@echo/firestore/types/abstract/document-change-type'
import type { FirestoreListingComplete } from '@echo/firestore/types/model/firestore-listing-complete'
import type { FirestoreNftCollectionDiscordGuild } from '@echo/firestore/types/model/firestore-nft-collection-discord-guild'
import { errorMessage } from '@echo/utils/error/error-message'
import { logger } from '@echo/utils/services/logger'
import { Client } from 'discord.js'

async function postListingToGuild(
  client: Client,
  listing: FirestoreListingComplete,
  discordGuild: FirestoreNftCollectionDiscordGuild
) {
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
export async function listingChangeHandler(
  client: Client,
  changeType: DocumentChangeType,
  listing: FirestoreListingComplete
) {
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
