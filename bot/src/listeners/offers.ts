import { listenToOffer } from '@echo/firebase-admin'
import { errorMessage, logger } from '@echo/utils'
import { Client } from 'discord.js'
import { isNil } from 'rambda'
import { buildNewOfferButtons } from '../builders/offer-button-builder'
import { buildOfferEmbed } from '../builders/offer-embed-builder'
import { getDiscordChannel } from '../utils/discord'

export function listenToOffers(client: Client) {
  listenToOffer((offer, change) => {
    try {
      const channel = getDiscordChannel(client, offer.collection.channelId)
      if (change.type === 'added' && isNil(offer.postedAt)) {
        // TODO Add proper offer management (buyer/seller and items)
        void channel
          // TODO how should we display offer items here?
          .send({
            components: [buildNewOfferButtons(offer)],
            embeds: [buildOfferEmbed(offer)]
          })
          .then(() => change.doc.ref.set({ ...change.doc.data(), postedAt: new Date().getTime() }))
          .catch((error) => {
            logger.error(`Error sending offer ${offer.id} to channel ${channel.id}: ${errorMessage(error)}`)
          })
      }
    } catch (error) {
      logger.error(`Error listening to offer: ${errorMessage(error)}`)
    }
  })
}
