import { buildNewListingButtons } from '../builders/listing-button-builder'
import { buildListingEmbed } from '../builders/listing-embed-builder'
import { getDiscordChannel } from '../utils/discord'
import { listenToListing } from '@echo/firebase-admin'
import { errorMessage, logger } from '@echo/utils'
import { Client } from 'discord.js'
import { isNil } from 'ramda'

export function listenToListings(client: Client) {
  listenToListing((listing, change) => {
    try {
      const channel = getDiscordChannel(client, listing.discordGuild.channelId)
      if (change.type === 'added' && isNil(listing.postedAt)) {
        // TODO Add proper offer management (buyer/seller and items)
        void channel
          // TODO how should we display offer items here?
          .send({
            components: [buildNewListingButtons(listing)],
            embeds: [buildListingEmbed(listing)]
          })
          .then(() => change.doc.ref.set({ ...change.doc.data(), postedAt: new Date().getTime() }))
          .catch((error) => {
            logger.error(`Error sending listing ${listing.id} to channel ${channel.id}: ${errorMessage(error)}`)
          })
      }
    } catch (error) {
      logger.error(`Error listening to listings: ${errorMessage(error)}`)
    }
  })
}
