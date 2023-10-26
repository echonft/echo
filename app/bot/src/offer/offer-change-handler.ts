import { createOfferThread } from '@echo/bot/offer/create-offer-thread'
import { getOfferThreadChannel } from '@echo/bot/offer/get-offer-thread-channel'
import { postOfferStateUpdate } from '@echo/bot/offer/post-offer-state-update'
import { addOfferThread } from '@echo/firestore/crud/offer-thread/add-offer-thread'
import { findOfferThread } from '@echo/firestore/crud/offer-thread/find-offer-thread'
import { findOfferStateUpdate } from '@echo/firestore/crud/offer-update/find-offer-state-update'
import { findUserByUsername } from '@echo/firestore/crud/user/find-user-by-username'
import { type DocumentChangeType } from '@echo/firestore/types/abstract/document-change-type'
import { type Offer } from '@echo/model/types/offer'
import { logger } from '@echo/utils/services/logger'
import { Client } from 'discord.js'
import { isNil } from 'ramda'

/**
 * Handles offer changes -  only check for new offers
 * @param client
 * @param changeType
 * @param offer
 */
export async function offerChangeHandler(client: Client, changeType: DocumentChangeType, offer: Offer) {
  if (changeType === 'added') {
    const post = await findOfferThread(offer.id)
    if (isNil(post)) {
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
      const channel = await getOfferThreadChannel(client, offer, sender.discord.id, receiver.discord.id)
      if (isNil(channel)) {
        // TODO proper fallback
        logger.error(`No suitable channel found for offer ${offer.id}`)
        return
      }
      const threadId = await createOfferThread(channel, offer, sender.discord.id, receiver.discord.id)
      if (!isNil(threadId)) {
        await addOfferThread(offer.id, { discordId: channel.guildId, channelId: channel.id, threadId })
      }
    }
  } else {
    const update = findOfferStateUpdate(offer.id, offer.state)
    if (isNil(update)) {
      await postOfferStateUpdate(client, offer)
    }
  }
}
