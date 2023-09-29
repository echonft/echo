import { getDiscordChannel } from '@echo/bot/helpers/get-discord-channel'
import { offerLink } from '@echo/bot/routing/offer-link'
import { findUserByUsername } from '@echo/firestore/crud/user/find-user-by-username'
import { getOfferReceiverItemsGuild } from '@echo/firestore/helpers/offer/get-offer-receiver-items-guild'
import type { DocumentChangeType } from '@echo/firestore/types/abstract/document-change-type'
import type { FirestoreOffer } from '@echo/firestore/types/model/offer/firestore-offer'
import { errorMessage } from '@echo/utils/error/error-message'
import { logger } from '@echo/utils/services/logger'
import { ChannelType, Client } from 'discord.js'
import { isNil } from 'ramda'

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
      const sender = await findUserByUsername(offer.sender.username)
      if (isNil(sender)) {
        logger.error(`sender with username ${offer.sender.username} not found`)
        return
      }
      const receiver = await findUserByUsername(offer.receiver.username)
      if (isNil(receiver)) {
        logger.error(`receiver with username ${offer.receiver.username} not found`)
        return
      }
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
      await thread.members.add(sender.discord.id)
      await thread.members.add(receiver.discord.id)
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
