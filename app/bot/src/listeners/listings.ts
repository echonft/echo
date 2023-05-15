import { buildNewListingButtons } from '../builders/listing-button-builder'
import { buildListingEmbed } from '../builders/listing-embed-builder'
import { getDiscordChannel } from '../utils/discord'
import { listenToRequestForOffers } from '@echo/firebase-admin'
import { errorMessage, logger } from '@echo/utils'
import { Client } from 'discord.js'
import { isNil } from 'ramda'

export function listenToListings(client: Client) {
  listenToRequestForOffers(async (listing, change) => {
    try {
      const channel = await getDiscordChannel(client, listing.discordGuild.channelId)
      if (change.type === 'added' && isNil(listing.postedAt)) {
        void channel
          .send({
            components: [buildNewListingButtons(listing)],
            embeds: [buildListingEmbed(listing)]
          })
          .then(() => {
            void change.doc.ref.update({ postedAt: new Date().getTime() })
          })
          .catch((error) => {
            logger.error(`Error sending listing ${listing.id} to channel ${channel.id}: ${errorMessage(error)}`)
          })
      }
    } catch (error) {
      logger.error(`Error listening to listings: ${JSON.stringify(error)} for listing ${listing.id}`)
    }
  })
}
