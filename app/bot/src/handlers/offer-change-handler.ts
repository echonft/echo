import { getDiscordChannel } from '@echo/bot/helpers/get-discord-channel'
import { offerLink } from '@echo/bot/routing/offer-link'
import { setOfferDiscordGuild } from '@echo/firestore/crud/offer/set-offer-discord-guild'
import { findUserByUsername } from '@echo/firestore/crud/user/find-user-by-username'
import { userIsInGuild } from '@echo/firestore/crud/user-discord-guild/user-is-in-guild'
import { getOfferReceiverItemsGuild } from '@echo/firestore/helpers/offer/get-offer-receiver-items-guild'
import type { DocumentChangeType } from '@echo/firestore/types/abstract/document-change-type'
import type { FirestoreOfferComplete } from '@echo/firestore/types/model/firestore-offer-complete'
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
export async function offerChangeHandler(
  client: Client,
  changeType: DocumentChangeType,
  offer: FirestoreOfferComplete
) {
  if (changeType === 'added') {
    try {
      // FIXME validate
      const discordGuild = getOfferReceiverItemsGuild(offer)
      const sender = await findUserByUsername(offer.sender.username)
      if (isNil(sender)) {
        logger.error(`user with username ${offer.sender.username} does not exist`)
        return
      }
      const receiver = await findUserByUsername(offer.receiver.username)
      if (isNil(receiver)) {
        logger.error(`user with username ${offer.receiver.username} does not exist`)
        return
      }
      const channel = await getDiscordChannel(client, discordGuild.channelId)
      // FIXME validate they might not both be in the guild
      const senderIsInGuild = await userIsInGuild(sender.id, discordGuild)
      if (!senderIsInGuild) {
        logger.error(
          `sender (userId ${sender.id} of offer with id ${offer.id} is not in guild ${discordGuild.discordId}`
        )
        return
      }
      const receiverIsInGuild = await userIsInGuild(receiver.id, discordGuild)
      if (!receiverIsInGuild) {
        logger.error(
          `receiver (userId ${receiver.id} of offer with id ${offer.id} is not in guild ${discordGuild.discordId}`
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
      await thread.members.add(offer.sender.discordId)
      await thread.members.add(offer.receiver.discordId)
      await thread.send({
        content: `Private thread to negotiate the offer. To accept, reject or cancel the offer, go to: ${offerLink(
          offer
        )}`
      })
      await setOfferDiscordGuild(offer.id, discordGuild, thread.id)
    } catch (e) {
      logger.error(`Error while listening to added offer ${offer.id}: ${errorMessage(e)}`)
    }
  }
}
