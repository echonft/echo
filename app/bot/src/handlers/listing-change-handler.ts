import { buildNewListingButtons } from '../builders/listing-button-builder'
import { buildListingEmbed } from '../builders/listing-embed-builder'
import { getDiscordChannel } from '../utils/get-discord-channel'
import { DocumentChange, Listing } from '@echo/firestore'
import { errorMessage, logger } from '@echo/utils'
import { Client } from 'discord.js'
import { isNil } from 'ramda'

/**
 * Handles listing changes, only check for new listings that have not been posted
 * @param client
 * @param listings
 * @param docChanges
 */
export function listingChangeHandler(client: Client, listings: Listing[], docChanges: DocumentChange<Listing>[]) {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  docChanges.forEach(async (docChange, index) => {
    const listing = listings[index]!
    // If doc is not added and not posted, do nothing
    if (docChange.type === 'added' && isNil(listing.postedAt)) {
      const discordGuild = listing.items[0]!.collection.discordGuild
      try {
        const channel = await getDiscordChannel(client, discordGuild.channelId)
        try {
          await channel.send({
            components: [buildNewListingButtons(listing.id, discordGuild.discordId)],
            embeds: [buildListingEmbed(listing)]
          })
          try {
            await docChange.doc.ref.update({ postedAt: new Date().getTime() })
          } catch (e) {
            logger.error(`listingChangeHandler Error updating listing ${listing.id}: ${errorMessage(e)}`)
          }
        } catch (e) {
          logger.error(
            `listingChangeHandler Error sending listing ${listing.id} to channel ${channel.id}: ${errorMessage(e)}`
          )
        }
      } catch (e) {
        logger.error(`listingChangeHandler Error getting Discord channel ${discordGuild.channelId}: ${errorMessage(e)}`)
      }
    }
  })
}
