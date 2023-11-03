import { guarded_addOfferStateUpdate } from '@echo/bot/firestore/guarded_add-offer-state-update'
import { guarded_addOfferThread } from '@echo/bot/firestore/guarded_add-offer-thread'
import { guarded_addOfferThreadCloseRequest } from '@echo/bot/firestore/guarded_add-offer-thread-close-request'
import { guarded_findOfferThread } from '@echo/bot/firestore/guarded_find-offer-thread'
import { guarded_findOfferThreadCloseRequest } from '@echo/bot/firestore/guarded_find-offer-thread-close-request'
import { guarded_findUserByUsername } from '@echo/bot/firestore/guarded_find-user-by-username'
import { createOfferThread } from '@echo/bot/offer/create-offer-thread'
import { getOfferThreadChannel } from '@echo/bot/offer/get-offer-thread-channel'
import { postOfferStateUpdate } from '@echo/bot/offer/post-offer-state-update'
import { postOfferThreadClose } from '@echo/bot/offer/post-offer-thread-close'
import { findOfferThread } from '@echo/firestore/crud/offer-thread/find-offer-thread'
import { findOfferStateUpdate } from '@echo/firestore/crud/offer-update/find-offer-state-update'
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
    const thread = await guarded_findOfferThread(offer.id)
    if (isNil(thread)) {
      const sender = await guarded_findUserByUsername(offer.sender.username)
      if (isNil(sender)) {
        return
      }
      const receiver = await guarded_findUserByUsername(offer.receiver.username)
      if (isNil(receiver)) {
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
        await guarded_addOfferThread(offer.id, { discordId: channel.guildId, channelId: channel.id, threadId })
      }
    }
  } else if (changeType === 'modified') {
    const update = await findOfferStateUpdate(offer.id, offer.state)
    if (isNil(update)) {
      await postOfferStateUpdate(client, offer)
      await guarded_addOfferStateUpdate(offer.id)
      const { state } = offer
      if (state === 'REJECTED' || state === 'CANCELLED' || state === 'COMPLETED') {
        const thread = await findOfferThread(offer.id)
        if (!isNil(thread)) {
          const threadCloseRequest = await guarded_findOfferThreadCloseRequest(thread.id)
          if (isNil(threadCloseRequest)) {
            await guarded_addOfferThreadCloseRequest(thread.id)
            await postOfferThreadClose(client, thread)
          }
        }
      }
    }
  }
}
