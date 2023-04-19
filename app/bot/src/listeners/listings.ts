import { buildNewListingButtons } from '../builders/listing-button-builder'
import { buildListingEmbed } from '../builders/listing-embed-builder'
import { getDiscordChannel } from '../utils/discord'
import { listenToOffers } from '@echo/firebase-admin'
import { errorMessage, logger } from '@echo/utils'
import { Client } from 'discord.js'
import { isNil } from 'ramda'

// TODO Might not be needed
export function listenToListings(client: Client) {
  listenToOffers(async (listing, change) => {
    try {
      const channel = await getDiscordChannel(client, listing.discordGuild.channelId)
      if (change.type === 'added' && isNil(listing.postedAt)) {
        // TODO Add proper offer management (buyer/seller and items)
        void channel
          // TODO how should we display offer items here?
          .send({
            components: [buildNewListingButtons(listing)],
            embeds: [buildListingEmbed(listing)]
          })
          .then(() => {
            void change.doc.ref.set({ ...change.doc.data(), postedAt: new Date().getTime() })
          })
          .catch((error) => {
            logger.error(`Error sending listing ${listing.id} to channel ${channel.id}: ${errorMessage(error)}`)
          })
      }
    } catch (error) {
      logger.error(`Error listening to listings: ${errorMessage(error)}`)
    }
  })
}
