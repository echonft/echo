import { getDiscordChannel } from '../helpers/get-discord-channel'
import { getOfferGuild } from '../helpers/get-offer-guild'
import { offerLink } from '../routing/offer-link'
import { DocumentChange, findUserById, Offer, userIsInGuild } from '@echo/firestore'
import { errorMessage, logger } from '@echo/utils'
import {} from '@google-cloud/firestore'
import dayjs from 'dayjs'
import { ChannelType, Client } from 'discord.js'
import { isNil } from 'ramda'

/**
 * Handles listing changes, only check for new listings that have not been posted
 * @param client
 * @param offers
 * @param docChanges
 */
export async function offerChangeHandler(client: Client, offers: Offer[], docChanges: DocumentChange<Offer>[]) {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  return Promise.all(
    docChanges.map(async (docChange, index) => {
      const offer = offers[index]!
      // If doc is not added and not posted, do nothing
      if (docChange.type === 'added' && isNil(offer.postedAt)) {
        try {
          const discordGuild = getOfferGuild(offer)
          const sender = await findUserById(offer.sender.id)
          const receiver = await findUserById(offer.receiver.id)
          const channel = await getDiscordChannel(client, discordGuild.channelId)
          // Should not happen
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
            try {
              await thread.members.add(offer.sender.discordId)
              await thread.members.add(offer.receiver.discordId)
            } catch (e) {
              logger.error(
                `offerChangeHandler Error adding member to thread ${thread.id} for offer ${offer.id}: ${errorMessage(
                  e
                )}`
              )
            }
            try {
              await thread.send({
                content: `Private thread to negotiate the offer. To accept, reject or cancel the offer, go to: ${offerLink(
                  offer
                )}`
              })
            } catch (e) {
              logger.error(
                `offerChangeHandler Error sending message to thread ${thread.id} for offer ${offer.id}: ${errorMessage(
                  e
                )}`
              )
            }
            try {
              await docChange.doc.ref.update({ postedAt: dayjs().unix(), threadId: thread.id })
            } catch (e) {
              logger.error(`offerChangeHandler Error adding updating offer ${offer.id}: ${errorMessage(e)}`)
            }
          } else {
            logger.error(
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              `offerChangeHandler Error creating thread with sender ${offer.sender.id} (in guild ${userIsInGuild(
                sender,
                discordGuild
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              )}) and receiver ${offer.receiver.id} (in guild ${userIsInGuild(receiver, discordGuild)})`
            )
          }
        } catch (e) {
          logger.error(`offerChangeHandler Error for offer ${offer.id}: ${errorMessage(e)}`)
        }
      }
    })
  )
}
