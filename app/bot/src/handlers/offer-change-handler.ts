import { offerLink } from '../routing/offer-link'
import { getDiscordChannel } from '../utils/get-discord-channel'
import { userIsInGuild } from '../utils/model/user-is-in-guild'
import { FirestoreOffer, FirestoreOfferData } from '@echo/firestore'
import { errorMessage, logger } from '@echo/utils'
import { DocumentChange } from '@google-cloud/firestore'
import dayjs from 'dayjs'
import { ChannelType, Client } from 'discord.js'
import { isNil } from 'ramda'

/**
 * Handles listing changes, only check for new listings that have not been posted
 * @param client
 * @param listing
 * @param docChange
 */
export async function offerChangeHandler(
  client: Client,
  offer: FirestoreOfferData,
  docChange: DocumentChange<FirestoreOffer>
) {
  // If doc is not added and not posted, do nothing
  if (docChange.type === 'added' && isNil(offer.postedAt)) {
    try {
      const channel = await getDiscordChannel(client, offer.discordGuild.channelId)
      // Should not happen
      if (!userIsInGuild(offer.sender, offer.discordGuild) || !userIsInGuild(offer.receiver, offer.discordGuild)) {
        logger.error(
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          `offerChangeHandler Error creating thread with sender ${offer.sender.id} (in guild ${userIsInGuild(
            offer.sender,
            offer.discordGuild
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          )}) and receiver ${offer.receiver.id} (in guild ${userIsInGuild(offer.receiver, offer.discordGuild)})`
        )
        return
      }
      channel.threads
        .create({
          name: `Offer-${offer.id}`,
          // TODO Do we want 7 days? It's either 1 hour, 1 day, 3 days or 1 week.
          autoArchiveDuration: 10080,
          type: ChannelType.PrivateThread,
          // TODO We want something else here?
          reason: `Private thread to negotiate the offer. To accept, reject or cancel the offer, go to: ${offerLink(
            offer
          )}`
        })
        .then((thread) => {
          Promise.all([thread.members.add(offer.sender.discordId), thread.members.add(offer.receiver.discordId)])
            .then(() => {
              thread
                .send({
                  content: `Private thread to negotiate the offer. To accept, reject or cancel the offer, go to: ${offerLink(
                    offer
                  )}`
                })
                .catch((e) =>
                  logger.error(
                    `offerChangeHandler Error sending message to thread ${thread.id} for offer ${
                      offer.id
                    }: ${errorMessage(e)}`
                  )
                )
              docChange.doc.ref
                .update({ postedAt: dayjs().unix(), threadId: thread.id })
                .catch((e) =>
                  logger.error(`offerChangeHandler Error adding updating offer ${offer.id}: ${errorMessage(e)}`)
                )
            })
            .catch((e) =>
              logger.error(
                `offerChangeHandler Error adding member to thread ${thread.id} for offer ${offer.id}: ${errorMessage(
                  e
                )}`
              )
            )
        })
        .catch((e) =>
          logger.error(`offerChangeHandler Error creating thread for offer ${offer.id}: ${errorMessage(e)}`)
        )
    } catch (e) {
      logger.error(`offerChangeHandler Error for offer ${offer.id}: ${errorMessage(e)}`)
    }
  }
}
