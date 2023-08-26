import { getDiscordChannel } from '../helpers/get-discord-channel'
import { offerLink } from '../routing/offer-link'
import {
  DocumentChangeType,
  findUserById,
  getOfferReceiverGuild,
  Offer,
  postOffer,
  userIsInGuild
} from '@echo/firestore'
import { errorMessage, logger } from '@echo/utils'
import { ChannelType, Client } from 'discord.js'

/**
 * Handles offer changes -  only check for new offers
 * @param client
 * @param changeType
 * @param offer
 */
export async function offerChangeHandler(client: Client, changeType: DocumentChangeType, offer: Offer) {
  if (changeType === 'added') {
    try {
      // FIXME validate
      const discordGuild = getOfferReceiverGuild(offer)
      const sender = await findUserById(offer.sender.id)
      const receiver = await findUserById(offer.receiver.id)
      const channel = await getDiscordChannel(client, discordGuild.channelId)
      // FIXME validate they might not both be in the guild
      if (!userIsInGuild(sender!, discordGuild) || !userIsInGuild(receiver!, discordGuild)) {
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
        await postOffer(offer.id, thread.id)
      }
    } catch (e) {
      logger.error(`Error while listening to added offer ${offer.id}: ${errorMessage(e)}`)
    }
  }
}
