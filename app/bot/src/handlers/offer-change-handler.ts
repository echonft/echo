import { getDiscordChannel } from '@echo/bot/helpers/get-discord-channel'
import { offerLink } from '@echo/bot/routing/offer-link'
import { setOfferDiscordGuild } from '@echo/firestore/crud/offer/set-offer-discord-guild'
import { findUserById } from '@echo/firestore/crud/user/find-user-by-id'
import { getOfferReceiverItemsGuild } from '@echo/firestore/helpers/offer/get-offer-receiver-items-guild'
import { userIsInGuild } from '@echo/firestore/helpers/user/user-is-in-guild'
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
      const sender = await findUserById(offer.sender.id)
      if (isNil(sender)) {
        logger.error(`user with id ${offer.sender.id} is nil`)
        return
      }
      const receiver = await findUserById(offer.receiver.id)
      if (isNil(receiver)) {
        logger.error(`user with id ${offer.receiver.id} is nil`)
        return
      }
      const channel = await getDiscordChannel(client, discordGuild.channelId)
      // FIXME validate they might not both be in the guild
      if (!userIsInGuild(sender, discordGuild) || !userIsInGuild(receiver, discordGuild)) {
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
      }
    } catch (e) {
      logger.error(`Error while listening to added offer ${offer.id}: ${errorMessage(e)}`)
    }
  }
}
