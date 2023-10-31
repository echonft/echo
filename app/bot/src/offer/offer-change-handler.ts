import { guardedAddOfferStateUpdate } from '@echo/bot/firestore/guarded-add-offer-state-update'
import { guardedAddOfferThread } from '@echo/bot/firestore/guarded-add-offer-thread'
import { guardedAddOfferThreadCloseRequest } from '@echo/bot/firestore/guarded-add-offer-thread-close-request'
import { guardedFindOfferThread } from '@echo/bot/firestore/guarded-find-offer-thread'
import { guardedFindOfferThreadCloseRequest } from '@echo/bot/firestore/guarded-find-offer-thread-close-request'
import { guardedFindUserByUsername } from '@echo/bot/firestore/guarded-find-user-by-username'
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
    const thread = await guardedFindOfferThread(offer.id)
    if (isNil(thread)) {
      const sender = await guardedFindUserByUsername(offer.sender.username)
      if (isNil(sender)) {
        return
      }
      const receiver = await guardedFindUserByUsername(offer.receiver.username)
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
        await guardedAddOfferThread(offer.id, { discordId: channel.guildId, channelId: channel.id, threadId })
      }
    }
  } else if (changeType === 'modified') {
    const update = await findOfferStateUpdate(offer.id, offer.state)
    if (isNil(update)) {
      await postOfferStateUpdate(client, offer)
      await guardedAddOfferStateUpdate(offer.id)
      const { state } = offer
      if (state === 'REJECTED' || state === 'CANCELLED' || state === 'COMPLETED') {
        const thread = await findOfferThread(offer.id)
        if (!isNil(thread)) {
          const threadCloseRequest = await guardedFindOfferThreadCloseRequest(thread.id)
          if (isNil(threadCloseRequest)) {
            await guardedAddOfferThreadCloseRequest(thread.id)
            await postOfferThreadClose(client, thread)
          }
        }
      }
    }
  }
}
