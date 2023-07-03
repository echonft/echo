import { buildNewListingButtons } from '../builders/listing-button-builder'
import { buildListingEmbed } from '../builders/listing-embed-builder'
import { getDiscordChannel } from '../utils/get-discord-channel'
import { FirestoreRequestForOffer, FirestoreRequestForOfferData } from '@echo/firestore'
import { errorMessage, logger } from '@echo/utils'
import { DocumentChange } from '@google-cloud/firestore'
import { Client } from 'discord.js'
import { isNil } from 'ramda'

/**
 * Handles listing changes, only check for new listings that have not been posted
 * @param client
 * @param listing
 * @param docChange
 */
export async function listingChangeHandler(
  client: Client,
  listing: FirestoreRequestForOfferData,
  docChange: DocumentChange<FirestoreRequestForOffer>
) {
  // If doc is not added and not posted, do nothing
  if (docChange.type === 'added' && isNil(listing.postedAt)) {
    try {
      const channel = await getDiscordChannel(client, listing.discordGuild.channelId)
      void channel
        .send({
          components: [buildNewListingButtons(listing)],
          embeds: [buildListingEmbed(listing)]
        })
        .then(() => {
          void docChange.doc.ref
            .update({ postedAt: new Date().getTime() })
            .catch((e) => logger.error(`listingChangeHandler Error updating listing ${listing.id}: ${errorMessage(e)}`))
        })
        .catch((e) => {
          logger.error(
            `listingChangeHandler Error sending listing ${listing.id} to channel ${channel.id}: ${errorMessage(e)}`
          )
        })
    } catch (e) {
      logger.error(
        `listingChangeHandler Error getting Discord channel ${listing.discordGuild.channelId}: ${errorMessage(e)}`
      )
    }
  }
}
