import { getChannel } from '@echo/bot/helpers/get-channel'
import { archiveOfferThread } from '@echo/bot/offer/archive-offer-thread'
import { createOfferThread } from '@echo/bot/offer/create-offer-thread'
import { addOfferThread } from '@echo/firestore/crud/offer-thread/add-offer-thread'
import { findOfferThread } from '@echo/firestore/crud/offer-thread/find-offer-thread'
import { findOfferThreadsToArchive } from '@echo/firestore/crud/offer-thread/find-offer-threads-to-archive'
import { findUserByUsername } from '@echo/firestore/crud/user/find-user-by-username'
import { type DocumentChangeType } from '@echo/firestore/types/abstract/document-change-type'
import { type Offer } from '@echo/model/types/offer'
import { logger } from '@echo/utils/services/logger'
import { Client } from 'discord.js'
import { isNil } from 'ramda'

/**
 * Handles offer changes
 * @param client
 * @param changeType
 * @param offer
 */
export async function offerChangeHandler(client: Client, changeType: DocumentChangeType, offer: Offer) {
  logger.info(`offer ${offer.id} was written: ${changeType}`)
  const offerThread = await findOfferThread(offer.id)
  if (changeType === 'added' && isNil(offerThread)) {
    const sender = await findUserByUsername(offer.sender.username)
    if (isNil(sender)) {
      throw Error(`offer sender with username ${offer.sender.username} not found`)
    }
    const receiver = await findUserByUsername(offer.receiver.username)
    if (isNil(receiver)) {
      throw Error(`offer receiver with username ${offer.receiver.username} not found`)
    }
    const channel = await getChannel(client, process.env.ECHO_DISCORD_GUILD_CHANNEL_ID)
    const threadId = await createOfferThread(channel, offer, sender.discord.id, receiver.discord.id)
    await addOfferThread(offer.id, { discordId: channel.guildId, channelId: channel.id, threadId })
  }
  if (changeType === 'modified' && offer.readOnly && !isNil(offerThread) && offerThread.state === 'ACTIVE') {
    await archiveOfferThread(client, offerThread)
  }
  // check for offer threads to archive, just in case
  const offerThreadsToArchive = await findOfferThreadsToArchive()
  for (const offerThreadToArchive of offerThreadsToArchive) {
    await archiveOfferThread(client, offerThreadToArchive)
  }
}
