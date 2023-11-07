import { DEFAULT_THREAD_CLOSE_DELAY } from '@echo/bot/constants/default-thread-close-delay'
import { createOfferThread } from '@echo/bot/offer/create-offer-thread'
import { getOfferThreadChannel } from '@echo/bot/offer/get-offer-thread-channel'
import { postOfferStateUpdate } from '@echo/bot/offer/post-offer-state-update'
import { postOfferThreadClose } from '@echo/bot/offer/post-offer-thread-close'
import { addOfferThread } from '@echo/firestore/crud/offer-thread/add-offer-thread'
import { findOfferThread } from '@echo/firestore/crud/offer-thread/find-offer-thread'
import { addOfferThreadCloseRequest } from '@echo/firestore/crud/offer-thread-close-request/add-offer-thread-close-request'
import { findOfferThreadCloseRequest } from '@echo/firestore/crud/offer-thread-close-request/find-offer-thread-close-request'
import { addOfferStateUpdate } from '@echo/firestore/crud/offer-update/add-offer-state-update'
import { findOfferStateUpdate } from '@echo/firestore/crud/offer-update/find-offer-state-update'
import { findUserByUsername } from '@echo/firestore/crud/user/find-user-by-username'
import { type DocumentChangeType } from '@echo/firestore/types/abstract/document-change-type'
import { type Offer } from '@echo/model/types/offer'
import dayjs from 'dayjs'
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
    const thread = await findOfferThread(offer.id)
    if (isNil(thread)) {
      const sender = await findUserByUsername(offer.sender.username)
      if (isNil(sender)) {
        throw Error(`offer sender with username ${offer.sender.username} not found`)
      }
      const receiver = await findUserByUsername(offer.receiver.username)
      if (isNil(receiver)) {
        throw Error(`offer receiver with username ${offer.receiver.username} not found`)
      }
      const channel = await getOfferThreadChannel(client, offer, sender.discord.id, receiver.discord.id)
      if (isNil(channel)) {
        // TODO proper fallback
        throw Error(`No suitable channel found for offer ${offer.id}`)
      }
      const threadId = await createOfferThread(channel, offer, sender.discord.id, receiver.discord.id)
      await addOfferThread(offer.id, { discordId: channel.guildId, channelId: channel.id, threadId })
    }
  } else if (changeType === 'modified') {
    const update = await findOfferStateUpdate(offer.id, offer.state)
    if (isNil(update)) {
      await postOfferStateUpdate(client, offer)
      await addOfferStateUpdate(offer.id)
      const { state } = offer
      if (state === 'REJECTED' || state === 'CANCELLED' || state === 'COMPLETED') {
        const thread = await findOfferThread(offer.id)
        if (!isNil(thread)) {
          const threadCloseRequest = await findOfferThreadCloseRequest(thread.id)
          if (isNil(threadCloseRequest)) {
            await addOfferThreadCloseRequest(thread.id, dayjs().add(DEFAULT_THREAD_CLOSE_DELAY, 'h').unix())
            await postOfferThreadClose(client, thread)
          }
        }
      }
    }
  }
}
