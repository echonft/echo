import { buildBuyOfferButton } from '../builders/offer-button-builder'
import { getDiscordChannel } from '../utils/discord'
import { listenToOffer } from '@echo/firebase-admin/listeners/offer'
import { Client } from 'discord.js'
import { isNil } from 'ramda'

export function listenToOffers(client: Client) {
  listenToOffer((offer, change) => {
    try {
      const channel = getDiscordChannel(client, offer.collection.channelId)
      if (change.type === 'added' && isNil(offer.postedAt)) {
        // TODO Add proper offer management (buyer/seller and items)
        return channel
          .send({
            content: `New offer from <@${offer.owner.discordId}>: ${offer.ownerItems}`,
            components: [buildBuyOfferButton(offer)]
          })
          .then(() => change.doc.ref.set({ ...change.doc.data(), postedAt: new Date().getTime() }))
          .catch((err) => {
            throw err
          })
      }
      return Promise.resolve()
    } catch (error) {
      console.error(`Error listening to offer: ${(error as Error).message}`)
      return Promise.resolve()
    }
  })
}
