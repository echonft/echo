import { buildNewListingButtons } from '@echo/bot/builders/listing-button-builder'
import { buildListingEmbed } from '@echo/bot/builders/listing-embed-builder'
import { getDiscordChannel } from '@echo/bot/helpers/get-discord-channel'
import { findUserByUsername } from '@echo/firestore/crud/user/find-user-by-username'
import { getListingItemsGuild } from '@echo/firestore/helpers/listing/get-listing-items-guild'
import { getListingTargetsGuilds } from '@echo/firestore/helpers/listing/get-listing-targets-guilds'
import type { DocumentChangeType } from '@echo/firestore/types/abstract/document-change-type'
import { FirestoreListing } from '@echo/firestore/types/model/listing/firestore-listing'
import { FirestoreUser } from '@echo/firestore/types/model/user/firestore-user'
import { errorMessage } from '@echo/utils/error/error-message'
import { logger } from '@echo/utils/services/logger'
import { Client } from 'discord.js'
import { isNil } from 'ramda'

async function postListingToGuild(
  client: Client,
  listing: FirestoreListing,
  listingCreator: FirestoreUser,
  guildChannelId: string
) {
  const channel = await getDiscordChannel(client, guildChannelId)
  await channel.send({
    components: [buildNewListingButtons(listingCreator.username)],
    embeds: [buildListingEmbed(listing, listingCreator)]
  })
}

/**
 * Handles listing changes - only check for new listings
 * @param client
 * @param changeType
 * @param listing
 */
export async function listingChangeHandler(client: Client, changeType: DocumentChangeType, listing: FirestoreListing) {
  if (changeType === 'added') {
    try {
      const creator = await findUserByUsername(listing.creator.username)
      if (!isNil(creator)) {
        const listingItemsGuild = await getListingItemsGuild(listing)
        await postListingToGuild(client, listing, creator, listingItemsGuild.channelId)
        const targetsGuilds = await getListingTargetsGuilds(listing)
        for (const targetGuild of targetsGuilds) {
          await postListingToGuild(client, listing, creator, targetGuild.channelId)
        }
      }
    } catch (e) {
      logger.error(`Error while listening to added listings: ${errorMessage(e)}`)
    }
  }
}
