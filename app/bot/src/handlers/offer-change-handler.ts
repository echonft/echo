import { getDiscordChannel } from '@echo/bot/helpers/get-discord-channel'
import { offerLink } from '@echo/bot/routing/offer-link'
import { getOfferReceiver } from '@echo/firestore/helpers/offer/get-offer-receiver'
import { getOfferReceiverItemsGuild } from '@echo/firestore/helpers/offer/get-offer-receiver-items-guild'
import { getOfferSender } from '@echo/firestore/helpers/offer/get-offer-sender'
import type { DocumentChangeType } from '@echo/firestore/types/abstract/document-change-type'
import type { FirestoreOffer } from '@echo/firestore/types/model/offer/firestore-offer'
import { errorMessage } from '@echo/utils/error/error-message'
import { logger } from '@echo/utils/services/logger'
import { ChannelType, Client } from 'discord.js'

/**
 * Handles offer changes -  only check for new offers
 * @param client
 * @param changeType
 * @param offer
 */
export async function offerChangeHandler(client: Client, changeType: DocumentChangeType, offer: FirestoreOffer) {
  if (changeType === 'added') {
    try {
      // FIXME validate
      const discordGuild = await getOfferReceiverItemsGuild(offer)
      const sender = getOfferSender(offer)
      const receiver = getOfferReceiver(offer)
      const channel = await getDiscordChannel(client, discordGuild.channelId)
      // FIXME check this from Discord
      const senderIsInGuild = true
      if (!senderIsInGuild) {
        logger.error(
          `sender with username ${sender.username} of offer with id ${offer.id} is not in guild ${discordGuild.discordId}`
        )
        return
      }
      // FIXME check this from Discord
      const receiverIsInGuild = true
      if (!receiverIsInGuild) {
        logger.error(
          `receiver with username ${receiver.username} of offer with id ${offer.id} is not in guild ${discordGuild.discordId}`
        )
        return
      }
      const thread = await channel.threads.create({
        name: `Offer-${offer.id}`,
        autoArchiveDuration: 10080,
        type: ChannelType.PrivateThread,
        // TODO We want something else here?
        reason: `Private thread to negotiate the offer. To accept, reject or cancel the offer, go to: ${offerLink(
          offer
        )}`
      })
      await thread.members.add(sender.discordId)
      await thread.members.add(receiver.discordId)
      await thread.send({
        content: `Private thread to negotiate the offer. To accept, reject or cancel the offer, go to: ${offerLink(
          offer
        )}`
      })
      // TODO change this to offer post
      // await setOfferDiscordGuild(offer.id, discordGuild, thread.id)
    } catch (e) {
      logger.error(`Error while listening to added offer ${offer.id}: ${errorMessage(e)}`)
    }
  }
}
