import { listenToOffer } from '@echo/firebase-admin/listeners/offer'
import { buildBuyOfferButton } from 'builders/offer-button-builder'
import { Client } from 'discord.js'
import { isNil } from 'ramda'
import { getDiscordChannel } from 'utils/discord'

export function listenToOffers(client: Client) {
  listenToOffer(async (offer, change) => {
    const channel = getDiscordChannel(client, offer.collection.channelId)
    if (change.type === 'added' && isNil(offer.postedAt)) {
      // TODO Add proper offer management (buyer/seller and items)
      await channel?.send({
        content: `New offer from <@${offer.owner.discordId}>: ${offer.ownerItems}`,
        components: [buildBuyOfferButton(offer)]
      })
      await change.doc.ref.set({ ...change.doc.data(), postedAt: new Date().getTime() })
    }
  })
}
